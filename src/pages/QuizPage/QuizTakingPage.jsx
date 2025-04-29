import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Space, Button, message, Modal, Progress, Typography } from 'antd';
import QuizQuestion from '../../components/QuizComponent/QuizQuestion';
import QuizResults from '../../components/QuizComponent/QuizResults';
import { getQuizById, submitQuizAttempt } from '../../services/QuizService';
import { ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './QuizTakingPage.css';

const { Text } = Typography;

const QuizTakingPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const timerRef = useRef(null);

  // Function to format time in MM:SS format
  const formatTime = (seconds) => {
    if (seconds < 0) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate time percentage for progress bar
  const calculateTimePercentage = (timeLeft, totalTime) => {
    if (!totalTime) return 100;
    return Math.max(0, Math.min(100, (timeLeft / totalTime) * 100));
  };

  // Function to clear timer
  const clearQuizTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Submit quiz function (extracted to be reusable)
  const submitQuiz = useCallback(async (isTimeout = false) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    
    // Clear timer to prevent multiple submissions
    clearQuizTimer();
    
    // If timeout, show message only if we haven't already
    if (isTimeout && !hasTimedOut) {
      setHasTimedOut(true);
      message.warning('Hết thời gian làm bài! Bài làm đã được nộp tự động.');
    }
    
    try {
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      
      // Auto-answer unanswered questions if timed out
      let formattedAnswers;
      if (isTimeout) {
        formattedAnswers = quiz.questions.map((question, index) => {
          const userAnswer = currentAnswers[index];
          
          if (!userAnswer) {
            // Default answer for unanswered questions when timeout
            if (question.type === 'FILL_IN_BLANK') {
              return {
                questionIndex: index,
                selectedOption: 0,
                answer: ''
              };
            } else {
              return {
                questionIndex: index,
                selectedOption: 0,
                answer: null
              };
            }
          }
          
          // Format answered questions normally
          if (question.type === 'FILL_IN_BLANK') {
            return {
              questionIndex: index,
              selectedOption: 0,
              answer: userAnswer.answer || ''
            };
          } else {
            return {
              questionIndex: index,
              selectedOption: Number(userAnswer.selectedOption),
              answer: null
            };
          }
        });
      } else {
        // Normal submission with validation
        formattedAnswers = quiz.questions.map((question, index) => {
          const userAnswer = currentAnswers[index];
          
          if (!userAnswer) {
            throw new Error(`Thiếu câu trả lời cho câu hỏi ${index + 1}`);
          }
          
          if (question.type === 'FILL_IN_BLANK') {
            return {
              questionIndex: index,
              selectedOption: 0,
              answer: userAnswer.answer || ''
            };
          } else if (question.type === 'MULTIPLE_CHOICE' || question.type === 'TRUE_FALSE') {
            return {
              questionIndex: index,
              selectedOption: Number(userAnswer.selectedOption),
              answer: null
            };
          } else {
            return {
              questionIndex: index,
              selectedOption: 0,
              answer: null
            };
          }
        });
      }

      // Check access token
      const token = localStorage.getItem('access_token');
      if (!token) {
        message.error('Bạn chưa đăng nhập. Vui lòng đăng nhập để nộp bài.');
        navigate('/login');
        return;
      }

      const response = await submitQuizAttempt(quizId, {
        answers: formattedAnswers,
        timeSpent: timeTaken
      });
      
      // Process response data
      if (response && response.data && response.data.attempt) {
        const attemptData = response.data.attempt;
        
        setQuizAttempt({
          score: response.data.score,
          percentageScore: response.data.score,
          timeSpent: attemptData.timeSpent,
          answers: attemptData.answers,
          isPassed: response.data.isPassed,
          status: attemptData.status,
          totalQuestions: response.data.totalQuestions
        });
      } else if (response && response.data) {
        setQuizAttempt(response.data);
      } else {
        setQuizAttempt(response);
      }
      
      setShowResults(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      
      if (error?.response?.status === 401 || error?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để nộp bài.');
        navigate('/login');
      } else if (error?.response?.data?.message) {
        message.error(`Lỗi: ${error.response.data.message}`);
      } else if (error.message) {
        message.error(error.message);
      } else {
        message.error('Có lỗi xảy ra khi nộp bài. Vui lòng thử lại.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [quiz, currentAnswers, startTime, quizId, navigate, isSubmitting, hasTimedOut]);

  // Timer effect for countdown
  useEffect(() => {
    if (!quiz || !quiz.timeLimit || hasTimedOut) return;
    
    // Initialize time left when quiz loads
    if (timeLeft === null) {
      setTimeLeft(quiz.timeLimit); // timeLimit is in seconds
    }
    
    // Timer interval
    clearQuizTimer(); // Clear any existing timer
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearQuizTimer();
          submitQuiz(true); // Auto submit on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clear timer on unmount or when quiz changes
    return () => clearQuizTimer();
  }, [quiz, timeLeft, submitQuiz, hasTimedOut]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        if (error?.status === 401) {
          message.error('Vui lòng đăng nhập để làm bài kiểm tra.');
          navigate('/login');
        } else {
          message.error('Không thể tải bài kiểm tra. Vui lòng thử lại sau.');
          navigate('/quizzes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
    
    // Clear timer when component unmounts
    return () => clearQuizTimer();
  }, [quizId, navigate]);

  const handleAnswerChange = (questionIndex, answer, type) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionIndex]: {
        questionIndex,
        selectedOption: type === 'FILL_IN_BLANK' ? null : Number(answer),
        answer: type === 'FILL_IN_BLANK' ? answer : null,
        type
      }
    }));
  };

  const handleSubmit = async () => {
    Modal.confirm({
      title: 'Xác nhận nộp bài',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn nộp bài không?',
      okText: 'Nộp bài',
      cancelText: 'Hủy',
      onOk: () => submitQuiz(false)
    });
  };

  const handleRetry = () => {
    setCurrentAnswers({});
    setShowResults(false);
    setQuizAttempt(null);
    setHasTimedOut(false);
    // Reset timer if quiz has time limit
    if (quiz && quiz.timeLimit) {
      setTimeLeft(quiz.timeLimit);
    }
  };

  const handleViewLeaderboard = () => {
    navigate(`/quizzes/${quizId}/leaderboard`);
  };

  if (loading) {
    return (
      <Card>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <p>Đang tải bài kiểm tra...</p>
        </Space>
      </Card>
    );
  }

  if (!quiz) {
    return (
      <Card>
        <Space direction="vertical" align="center" style={{ width: '100%' }}>
          <p>Không tìm thấy bài kiểm tra</p>
          <Button onClick={() => navigate('/quizzes')}>Quay lại</Button>
        </Space>
      </Card>
    );
  }

  if (showResults && quizAttempt) {
    return (
      <QuizResults
        quiz={quiz}
        quizAttempt={quizAttempt}
        onRetry={handleRetry}
        onViewLeaderboard={handleViewLeaderboard}
      />
    );
  }

  const allQuestionsAnswered = quiz && Array.isArray(quiz.questions)
    ? quiz.questions.every((_, index) => currentAnswers[index])
    : false;

  // Determine color for timer based on remaining time
  const getTimerColor = () => {
    if (!quiz.timeLimit) return '';
    
    const percentage = (timeLeft / quiz.timeLimit) * 100;
    if (percentage <= 25) return 'time-danger';
    if (percentage <= 50) return 'time-warning';
    return '';
  };

  return (
    <div className="quiz-taking-container">
      <Card className="quiz-taking-card">
        <div className="quiz-header">
          <Typography.Title level={2} className="quiz-title">{quiz.title}</Typography.Title>
          <Typography.Text className="quiz-description">{quiz.description}</Typography.Text>
        </div>
        
        {quiz.timeLimit && !hasTimedOut && (
          <div className="quiz-info-container">
            <div className="quiz-info-item">
              <ClockCircleOutlined className={`quiz-info-icon ${getTimerColor()}`} />
              <Text className={getTimerColor()}>
                Thời gian còn lại: {formatTime(timeLeft)}
              </Text>
            </div>
            <Progress 
              percent={calculateTimePercentage(timeLeft, quiz.timeLimit)} 
              showInfo={false}
              status={timeLeft <= quiz.timeLimit * 0.25 ? "exception" : "active"}
              strokeColor={
                timeLeft <= quiz.timeLimit * 0.25 ? "#ff4d4f" : 
                timeLeft <= quiz.timeLimit * 0.5 ? "#faad14" : "#1890ff"
              }
              className="time-progress"
            />
          </div>
        )}
        
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {Array.isArray(quiz.questions) && quiz.questions.map((question, index) => (
            <QuizQuestion
              key={index}
              question={question}
              questionNumber={index + 1}
              currentAnswer={currentAnswers[index]?.selectedOption ?? currentAnswers[index]?.answer}
              onAnswerChange={(answer) => handleAnswerChange(index, answer, question.type)}
              showResults={showResults}
              isSubmitting={isSubmitting}
            />
          ))}
          
          <div className="question-progress">
            <Progress 
              percent={(Object.keys(currentAnswers).length / quiz.questions.length) * 100} 
              format={() => `${Object.keys(currentAnswers).length}/${quiz.questions.length}`}
            />
          </div>
          
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered || isSubmitting}
            loading={isSubmitting}
            className="submit-btn"
          >
            Nộp bài
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default QuizTakingPage; 
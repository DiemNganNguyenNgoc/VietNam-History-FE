import React from "react";

const FormComponent = ({ placeholder, type, label, icon, ...rests }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <label className="form-label" style={{ display: 'block', marginBottom: '5px', fontSize:'16px' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                {icon && (
                    <span
                        style={{
                            position: 'absolute',
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '18px',
                            color: '#888', // Chỉnh màu icon nếu cần
                        }}
                    >
                        {icon}
                    </span>
                )}
                <input
                    placeholder={placeholder}
                    type={type}
                    style={{
                        padding: icon ? '0 20px 0 30px' : '0 20px', // Điều chỉnh padding nếu có icon
                        backgroundColor: '#F2F5FF',
                        fontSize: '14px',
                        width: '100%',
                        height: '35px',
                        border: 'none',
                        borderRadius: '10px',
                    }}
                    {...rests}
                />
            </div>
        </div>
    );
};

export default FormComponent;

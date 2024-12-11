import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import FormComponent from '../../components/FormComponent/FormComponent';
import * as message from "../../components/MessageComponent/MessageComponent";
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import SortBtn_Tags from '../../components/SortBtn/SortBtn_Tags';
import TagsBoxComponent from '../../components/TagsBoxComponent/TagsBoxComponent';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as TagService from '../../services/TagService';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';

const TagsPage = () => {
    //state cho form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeName = (value) => setName(value);
    const handleOnChangeDes = (value) => setDescription(value);

    // Hàm reset form
    const resetForm = () => {
        setName('');
        setDescription('');
    };

    // Mutation để thêm tag
    const mutation = useMutationHook(data => TagService.addTag(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    // Lấy danh sách đơn vị từ API
    const getAllTag = async () => {
        const res = await TagService.getAllTag();
        return res.data;
    };

    const { isLoading: isLoadingTag, data: tags } = useQuery({
        queryKey: ['tags'],
        queryFn: getAllTag,
    });

    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            message.success();
            alert('Add new tag successfully!');
            resetForm();
            setShowModal(false);
        }
        if (isError) {
            message.error();
        }
    }, [isSuccess, isError, navigate]);

    const handleAddTag = () => {
        setShowModal(true); // Mở modal khi muốn thêm tag
    };

    const onSave = async () => {
        await mutation.mutateAsync({ name, description });

    };

    const onCancel = () => {
        alert('Cancel adding the tag!');
        resetForm();
        setShowModal(false);
    };

    return (
        <>
            <div className="container text-left">
                <div className="row mb-3">
                    <div className="col-6">
                        <h1 className="my-4" style={{ color: '#033F74' }}>Tags</h1>
                    </div>
                    <div className="col-6 d-flex justify-content-end" style={{ marginTop: '30px' }}>
                        <div style={{ marginLeft: 'auto' }}>
                            <ButtonComponent
                                textButton="Add new tag"
                                icon={<i className="bi bi-plus-circle"></i>}
                                onClick={handleAddTag}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-left">
                <div className="row mb-3">
                    <div className="col-6">
                        <input className="form-control" type="text" placeholder="Search tag by name" style={{ width: '300px', height: '35px' }} />
                    </div>
                    <div className="col d-flex justify-content-end" style={{ marginTop: '30px' }}>
                        <div style={{ marginLeft: 'auto' }}>
                            <SortBtn_Tags />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
                    {isLoadingTag ? (
                        <tr>
                            <td colSpan="4" className="text-center">
                                <LoadingComponent />
                            </td>
                        </tr>
                    ) : tags && tags.length > 0 ? (
                        tags.map((tag) => (
                            <div className="col-6 col-md-4 col-lg-2 mb-4" key={tag._id}>
                                <TagsBoxComponent
                                    tagsname={tag.name}
                                    description={tag.description}
                                    // quantity={tag.quantity}
                                />
                            </div>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                Không có dữ liệu để hiển thị.
                            </td>
                        </tr>
                    )}
                    {/* {tags.map((tag) => (
                        <div className="col-6 col-md-4 col-lg-2 mb-4" key={tag._id}>
                            <TagsBoxComponent
                                tagsname={tag.name}
                                description={tag.description}
                                quantity={tag.quantity}
                            />
                        </div>
                    ))} */}
                </div>
            </div>

            {/* Modal để thêm tag mới */}
            <ModalComponent
                isOpen={showModal}
                title="ADD NEW TAG"
                body={
                    <>
                        <FormComponent
                            id="nameTagInput"
                            label="Name"
                            type="text"
                            placeholder="Enter tag's name"
                            value={name}
                            onChange={handleOnChangeName}
                        />
                        <FormComponent
                            id="descTagInput"
                            label="Description"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={handleOnChangeDes}
                        />
                        {data?.status === 'ERR' &&
                            <span style={{ color: "red", fontSize: "16px" }}>{data?.message}</span>}
                    </>
                }
                textButton1="Add"
                onClick1={onSave}
                onClick2={onCancel}
            />
        </>
    );
};

export default TagsPage;

import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'
import {useEffect, useState} from "react";
import {
    handleGetAllProd,
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage, useChooseAll,
    useHookProdForm
} from "../../../../utils/handleFuncs";
import axios from "axios";
import {toast} from "react-toastify";
import {handleRenderSelectCard} from "../../../../utils/handleRenderFuncs";

const AddNewProd = ({setStatus}) => {
    const {formData, setFormData} = useHookProdForm();
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [farmData, setFarmData] = useState([]);
    const [typeData, setTypeData] = useState([]);
    const {chooseAll, chooseOne, handleChooseAll, setChooseOne, setChooseAll} = useChooseAll(data.length);

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FISH);
    }

    const handleCancelForm = async (e) => {
        e.preventDefault();
        setStatus(false);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/manager/delete-image/${sessionStorage.getItem("publicId")}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
                },
                method: "DELETE"
            })
            if (!response.ok) {
                console.log('Can not delete this, please contact to technical to resolve!');
            }
        } catch (e) {
            console.log('error: ', e.message);
        }
    }

    useEffect(() => {
        if (imageUrl !== '') {
            toast.success('Cacthed this file!')
            setFormData({
                ...formData,
                image: imageUrl
            })
        }
    }, [imageUrl]);

    useEffect(() => {
        handleGetAllProd('http://localhost:8080/api/v1/manager/farm/get-all-farm', sessionStorage.getItem('token'), setFarmData, setChooseOne);
        handleGetAllProd('http://localhost:8080/api/v1/manager/fish-types/get-all-fish-types', sessionStorage.getItem('token'), setTypeData, null);
    }, []);

    useEffect(() => {
        console.log(typeData)
    }, [typeData]);

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm sản phẩm mới</h3>
                <form className={'form-field'}
                      onSubmit={(e) => handleSubmit(e,
                          formData,
                          "http://localhost:8080/api/v1/manager/fish/create-fish",
                          sessionStorage.getItem('token'),
                          'POST',
                          setStatus,
                          '/admin/products')}
                      style={{flexDirection: 'column'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        width: 'inherit'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%',
                            margin:'0 5px 0 0'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên sản phẩm</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'name'}
                                       required={true}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mức giá</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'price'}
                                       required={true}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Số lượng tồn</legend>
                                <input className={'textInput'}
                                       type={'text'}
                                       name={'quantity'}
                                       required={true}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%',
                            margin:'0 5px 0 5px'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Kích thước sản phẩm (cm)</legend>
                                <input className={'textInput'}
                                       type={'number'} name={'size'}
                                       required={true}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData, setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Trang trại</legend>
                                {handleRenderSelectCard('farmId', -1, farmData, false, {formData, setFormData})}

                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Phân loại</legend>
                                {handleRenderSelectCard('fishTypeId', -1, typeData, false, {formData, setFormData})}
                            </fieldset>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '30%',
                            margin:'0 0 0 5px'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh sản phẩm</legend>
                                <input className={'textInput'} type={'file'} onChange={handleGetFile}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'} disabled={imageUrl === ''}>Xác nhận</button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
            <div className={'bg-close-dialog'}
                 onClick={handleCancelForm}></div>
        </div>
    )
}
export default AddNewProd

import {
    handleGetElementFromInp,
    handleSubmit,
    handleUploadImage,
    useHookFarmForm
} from "../../../../utils/handleFuncs";
import {useEffect, useState} from "react";
import '../../../../assets/css/Admin/Component/CreateNew/addNewProd.css'

const UpdateFarm = ({data, setStatus}) => {
    const {formData, setFormData} = useHookFarmForm();
    const [imageUrl, setImageUrl] = useState('');

    const handleGetFile = async (e) => {
        await handleUploadImage(e.target.files[0], setImageUrl, process.env.REACT_APP_UPLOAD_PRESET_FARM);
    }

    const handleCancelForm = (e) => {
        e.preventDefault();
        setStatus(false);
    }

    useEffect(() => {
        setFormData(data);
    }, [])

    return (
        <div className={'form-container'}>
            <div className={'form-content'}>
                <h3>Thêm sản phẩm mới</h3>
                <form className={'form-field'}
                      onSubmit={(e) => handleSubmit(e, formData, 'http://localhost:8080/api/v1/manager/farm/create-farm', sessionStorage.getItem('token'), setStatus, 'farms')}>
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
                            width: '35%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Tên trang trại</legend>
                                <input className={'textInput'} type={'text'} name={'name'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Địa chỉ trang trại</legend>
                                <input className={'textInput'} type={'text'} name={'location'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>

                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '35%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Thông tin liên hệ</legend>
                                <input className={'textInput'} type={'text'} name={'contactInfo'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                            <fieldset className={'fieldset'}>
                                <legend>Mô tả</legend>
                                <input className={'textInput'} type={'text'} name={'description'}
                                       onChange={(e) => handleGetElementFromInp(e, {formData,setFormData})}/>
                            </fieldset>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '30%'
                        }}>
                            <fieldset className={'fieldset'}>
                                <legend>Hình ảnh trang trại</legend>
                                <input className={'textInput'} type={'file'} onChange={handleGetFile}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className={'optionBtns'}>
                        <button className={'featureBtn'} type={'submit'}
                                disabled={imageUrl === ''}>Xác nhận
                        </button>
                        <button className={'featureBtn'} onClick={handleCancelForm}>Hủy bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UpdateFarm;
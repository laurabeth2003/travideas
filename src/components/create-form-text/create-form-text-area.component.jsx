import './create-form-text-area.styles.scss'

const CreateFormTextArea = ({handleChange, label, ...otherProps}) => (
    <div className = "create-group">
    {
        <label className='create-form-label'>
         {label}
        </label>
        
    }
        <textarea className='create-form-text-area' onChange={handleChange} {...otherProps} />
        
    
    </div>

)

export default CreateFormTextArea

import './create-form-input.styles.scss'

const CreateFormInput = ({handleChange, label, ...otherProps}) => (
    <div className = "create-group">
    {
        <label className='create-form-label'>
         {label}
        </label>
    }
        <input className='create-form-input' onChange={handleChange} {...otherProps} />
        
    
    </div>
)

export default CreateFormInput

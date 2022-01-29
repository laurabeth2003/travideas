import './create-form-select.styles.scss'
//<option value={labels[option]}>{option}</option>
const CreateFormSelect = ({handleChange, label, options, ...otherProps}) => (
    <div className = "create-group-select">
    {
        <label className='create-label-select'>
         {label}
        </label>
    }
        <select className='create-input-select' onChange={handleChange} {...otherProps}>
            {options.map(option => (<option value={option} key={option}>{option}</option>))
            }


        </select>
        
    
    </div>
)

export default CreateFormSelect
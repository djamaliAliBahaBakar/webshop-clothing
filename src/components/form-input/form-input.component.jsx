import './form-input.styles.scss'
const FormInput = ({label, ...otherProps}) => {
    return (
        
        <div className="group">
            <input className="input-form"  {...otherProps}/>
            {label && (
            <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>
            )}
            
        
       
        </div>
    )
}

export default FormInput;
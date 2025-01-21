export default function TextInputElement(
    {
        children,
        style = null,
        id = null,
        ref = null,
        disabled = false,
        readOnly = false,
        value = undefined,
        defaultValue = undefined,
        type = 'text',
        className = null,
        onChange = null,
        onInput = null,
        name = null,
        placeholder = null,
        onBlur = null,
        onFocus = null,
    }
) {
    // ALL TEXT INPUT ELEMENT TAGS
    const TEXT_INPUT_ELEMENT_TAGS = ['text', 'password', 'email', 'number'];

    // CHECK IF TYPE NOT A STRING
    if(typeof type !== 'string') {
        throw new Error(`type prop should be a string.`);
    }

    // CHECK TYPE NOT IN TEXT_INPUT_ELEMENT_TAGS
    if(!TEXT_INPUT_ELEMENT_TAGS.includes(type)) {
        throw new Error(`type prop should be only: ${TEXT_INPUT_ELEMENT_TAGS.join(', ')}`);
    }

    // CREATING ELEMENT
    let TextInputComponent = 'input';

    // CREATING TEXT INPUT COMPONENT PROPS
    let textInputComponentProps = {
        id, style, ref, disabled, type, readOnly, onChange, onInput, onBlur, onFocus, value, defaultValue, name, placeholder
    }

    // RETURNING TEXT INPUT COMPONENT
    return <div className={`textInputWrapper ${className}`}>
        <TextInputComponent autoComplete={"off"} className={`textInputElement`} {...textInputComponentProps} />
        {children}
    </div>
}
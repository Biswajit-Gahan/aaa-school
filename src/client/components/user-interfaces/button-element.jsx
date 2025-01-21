export default function ButtonElement(
    {
        children,
        as = 'button',
        style = null,
        id = null,
        ref = null,
        disabled = false,
        type = 'button',
        href = null,
        className = null,
        onClick = null,
    }
) {
    // ALL BUTTON ELEMENT TAGS
    const BUTTON_ELEMENT_TAGS = ['button', 'a'];

    // CHECK IF AS NOT A STRING
    if(typeof as !== 'string') {
        throw new Error(`as prop should be a string.`);
    }

    // CHECK AS NOT IN BUTTON_ELEMENT_TAGS
    if(!BUTTON_ELEMENT_TAGS.includes(as)) {
        throw new Error(`as prop should be only: ${BUTTON_ELEMENT_TAGS.join(', ')}`);
    }

    // CREATING ELEMENT
    let ButtonComponent = as;

    // CREATING BUTTON COMPONENT PROPS
    let buttonComponentProps = {
        id, style, ref, disabled, type, href, onClick
    }

    // RETURNING BUTTON COMPONENT
    return <ButtonComponent className={`buttonElement ${className}`} {...buttonComponentProps}>
        {children}
    </ButtonComponent>
}
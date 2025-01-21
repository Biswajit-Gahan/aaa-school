export default function TextElement(
    {
        children,
        as = 'p',
        style = null,
        id = null,
        ref = null,
        className = null,
    }
) {
    // ALL TEXT ELEMENT TAGS
    const TEXT_ELEMENT_TAGS = ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    // CHECK IF AS NOT A STRING
    if(typeof as !== 'string') {
        throw new Error(`as prop should be a string.`);
    }

    // CHECK AS NOT IN TEXT_ELEMENT_TAGS
    if(!TEXT_ELEMENT_TAGS.includes(as)) {
        throw new Error(`as prop should be only: ${TEXT_ELEMENT_TAGS.join(', ')}`);
    }

    // CREATING ELEMENT
    let TextComponent = as;

    // CREATING TEXT COMPONENT PROPS
    let textComponentProps = {
        id, style, ref
    }

    // RETURNING TEXT COMPONENT
    return <TextComponent className={`textElement ${className}`} {...textComponentProps}>
        {children}
    </TextComponent>
}
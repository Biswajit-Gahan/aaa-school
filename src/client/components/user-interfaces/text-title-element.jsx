export default function TextTitleElement(
    {
        children,
        style = null,
        id = null,
        ref = null,
        className = null,
        htmlFor = null,
    }
) {
    // CREATING ELEMENT
    let TextTitleComponent = 'label';

    // CREATING TEXT TITLE COMPONENT PROPS
    let textTitleComponentProps = {
        id, style, ref, htmlFor,
    }

    // RETURNING TEXT TITLE COMPONENT
    return <TextTitleComponent className={`textTitleElement ${className}`} {...textTitleComponentProps}>
        {children}
    </TextTitleComponent>
}
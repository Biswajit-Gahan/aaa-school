export default function DangerousElement(
    {
        as = 'div',
        style = null,
        className = null,
        id = null,
        ref = null,
        onClick = null,
        html = null,
    }
) {
    // ALL DANGEROUS ELEMENT TAGS
    const DANGEROUS_ELEMENT_TAGS = ['div'];

    // CHECK IF AS NOT A STRING
    if(typeof as !== 'string') {
        throw new Error(`type prop should be a string.`);
    }

    // CHECK AS NOT IN DANGEROUS_ELEMENT_TAGS
    if(!DANGEROUS_ELEMENT_TAGS.includes(as)) {
        throw new Error(`type prop should be only: ${DANGEROUS_ELEMENT_TAGS.join(', ')}`);
    }

    if(!html) {
        throw new Error(`html prop should not be empty in dangerous element.`);
    }

    // CREATING DANGEROUS COMPONENT
    let DangerousComponent = as;

    // CREATING DANGEROUS COMPONENT PROPS
    let dangerousComponentProps = {
        style, id, ref, onClick
    }

    // RETURNING  COMPONENT
    return <DangerousComponent dangerouslySetInnerHTML={{ __html: html }} className={`containerElement ${className}`} {...dangerousComponentProps} style={style} />

}
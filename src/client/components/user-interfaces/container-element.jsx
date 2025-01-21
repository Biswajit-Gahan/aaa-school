export default function ContainerElement(
    {
        as = 'div',
        children,
        style = null,
        className = null,
        id = null,
        ref = null,
        onClick = null,
        shadow = false,
        shadowPosition = 'down',
    }
) {
    // ALL CONTAINER ELEMENT TAGS
    const CONTAINER_ELEMENT_TAGS = ['div', 'section', 'main', 'aside', 'article', 'footer', 'header', 'nav'];

    // CHECK IF AS NOT A STRING
    if(typeof as !== 'string') {
        throw new Error(`type prop should be a string.`);
    }

    // CHECK AS NOT IN CONTAINER_ELEMENT_TAGS
    if(!CONTAINER_ELEMENT_TAGS.includes(as)) {
        throw new Error(`type prop should be only: ${CONTAINER_ELEMENT_TAGS.join(', ')}`);
    }

    // SHADOW POSITIONS
    const SHADOW_POSITIONS = ['up', 'down'];

    // CHECK SHADOW POSITION NOT IN SHADOW_POSITIONS
    if(!SHADOW_POSITIONS.includes(shadowPosition)) {
        throw new Error(`type prop should be only: ${SHADOW_POSITIONS.join(', ')}`);
    }

    // CREATING CONTAINER COMPONENT
    let ContainerComponent = as;

    // CREATING CONTAINER COMPONENT PROPS
    let containerComponentProps = {
        style, id, ref, onClick
    }

    // BOX SHADOW
    const BOX_SHADOW_STYLE = {
        ...(shadowPosition === 'up' && {
            boxShadow: '0px -4px 8px -4px rgba(0,0,0,0.1)',
            MozBoxShadow: '0px -4px 8px -4px rgba(0,0,0,0.1)',
            WebkitBoxShadow: '0px -4px 8px -4px rgba(0,0,0,0.1)',
        }),

        ...(shadowPosition === 'down' && {
            boxShadow: '0px 4px 8px -4px rgba(0,0,0,0.1)',
            MozBoxShadow: '0px 4px 8px -4px rgba(0,0,0,0.1)',
            WebkitBoxShadow: '0px 4px 8px -4px rgba(0,0,0,0.1)',
        }),
    }

    // RETURNING  COMPONENT
    return <ContainerComponent className={`containerElement ${className}`} {...containerComponentProps} style={{...style, ...(shadow && BOX_SHADOW_STYLE)}}>
        {children}
    </ContainerComponent>
}
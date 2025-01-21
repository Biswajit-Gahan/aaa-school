function ListElement(
    {
        children,
        type = "ul",
        style = null,
        id = null,
        ref = null,
        className = "",
    }
) {
    // ALL LIST ELEMENT TAGS
    const LIST_ELEMENT_TAGS = ["ul", "ol"];

    // CHECK TYPE IN LIST_ELEMENT_TAGS
    if(!LIST_ELEMENT_TAGS.includes(type)) {
        throw new Error(`as prop should be only: ${LIST_ELEMENT_TAGS.join(', ')}`);
    }

    // CREATING ELEMENT
    let ListComponent = type;

    // CREATING LIST COMPONENT PROPS
    let listComponentProps = {
        id, style, ref,
    }

    // RETURNING LIST COMPONENT
    return <ListComponent className={`listElement ${className}`} {...listComponentProps}>
        {children}
    </ListComponent>
}

function ListItemElement(
    {
        children,
        style = null,
        id = null,
        ref = null,
        className = "",
    }
) {
    // CREATING ELEMENT
    let ListItemComponent = "li";

    // CREATING LIST ITEM COMPONENT PROPS
    let listItemComponentProps = {
        id, style, ref,
    }

    // RETURNING LIST COMPONENT
    return <ListItemComponent className={`listItemElement ${className}`} {...listItemComponentProps}>
        {children}
    </ListItemComponent>
}

export {ListElement, ListItemElement};
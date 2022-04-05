import React, { Component, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";


const options = [{
    "id": 1,
    "value": "9ce42304-b732-4791-9731-6f299b6df8c7",
    "label": "Blue"
}, {
    "id": 2,
    "value": "90419f06-7d07-45c8-bcec-d675096fe27f",
    "label": "Goldenrod"
}, {
    "id": 3,
    "value": "a23521da-0a48-4ef6-baa2-d727704f65c2",
    "label": "Teal"
}, {
    "id": 4,
    "value": "34b2b58a-0123-49e2-b2de-1eef0922139b",
    "label": "Puce"
}, {
    "id": 5,
    "value": "0fceaec7-fb46-4aef-994b-863a97130168",
    "label": "Khaki"
}, {
    "id": 6,
    "value": "b68c6b76-bbe0-49a6-8a90-209b8d88d353",
    "label": "Green"
}, {
    "id": 7,
    "value": "e2829c11-0960-490c-b19b-5c5bb26a18ce",
    "label": "Crimson"
}, {
    "id": 9,
    "value": "841e6f9f-1e19-4501-8b75-cd153282ed21",
    "label": "Orange"
}, {
    "id": 10,
    "value": "9346ba4b-8b3e-4c06-b930-cb3d98c58890",
    "label": "Turquoise"
}, {
    "id": 11,
    "value": "7294d507-d6c5-47bf-8ef3-c291c273b647",
    "label": "Violet"
}, {
    "id": 12,
    "value": "451d4254-a882-4d53-a4ca-c7cb4707d1a5",
    "label": "Red"
}, {
    "id": 15,
    "value": "2378fade-f686-4f0d-bf00-4e5213032c9b",
    "label": "Aquamarine"
}, {
    "id": 20,
    "value": "77ec7a0b-329d-4643-bbc7-0fa12c788ded",
    "label": "Mauv"
}]
/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class MultiselectDropdown extends Component {

    _renderMultiSelect = () => () => {

        const [selectedOptions, setSelectedOptions] = useState([]);

        useEffect(() => {
            setSelectedOptions([{ label: "All", value: "*" }, ...options]);
        }, []);

        function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
            if (value && value.some((o) => o.value === "*")) {
                return `${placeholderButtonLabel}: All`;
            } else {
                return `${placeholderButtonLabel}: ${value.length} selected`;
            }
        }

        function onChange(value, event) {
            if (event.action === "select-option" && event.option.value === "*") {
                this.setState(this.options);
            } else if (
                event.action === "deselect-option" &&
                event.option.value === "*"
            ) {
                this.setState([]);
            } else if (event.action === "deselect-option") {
                this.setState(value.filter((o) => o.value !== "*"));
            } else if (value.length === this.options.length - 1) {
                this.setState(this.options);
            } else {
                this.setState(value);
            }
        }

        return (
            <ReactMultiSelectCheckboxes
                options={[{ label: "All", value: "*" }, ...options]}
                placeholderButtonLabel="Colors"
                getDropdownButtonLabel={getDropdownButtonLabel}
                value={selectedOptions}
                onChange={onChange}
                setState={setSelectedOptions}
            />
        );
    }

    render() {
        const { id, label, setProps, value } = this.props;
        const MyInlineHook = this._renderMultiSelect();
        return (
            <div id={id}>
                <div><MyInlineHook /></div>
            </div>
        );
    }
}

MultiselectDropdown.defaultProps = {};

MultiselectDropdown.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

import React, { Component } from "react";
import {
    ElementsConsumer
} from "@stripe/react-stripe-js";
import PostAdd from '../../pages/post/PostAdd'
class PostAddComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            // <ElementsConsumer>
            //     {({ stripe, elements }) => (
            <PostAdd />
            //     )}
            // </ElementsConsumer>
        )
    }
}
export default PostAddComponent
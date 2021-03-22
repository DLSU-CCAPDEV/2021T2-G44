import "../assets/styles.css";
import { Link } from "react-router-dom";

export default function Button(props) {
    // Check if to was given or href

    if (props.to !== undefined) {
        return (
            <Link className="button" to={props.to} style={props.style}>
                <center>{props.text}</center>
            </Link>
        );
    }

    return (
        <a className="button" href={props.href} style={props.style}>
            <center>{props.text}</center>
        </a>
    );
}

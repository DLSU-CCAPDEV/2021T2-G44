import '../assets/styles.css'

export default function Button(props) {
    return (
        <a className="button" href={props.href} style={props.style}>
            <center>{props.text}</center>
        </a>
    )
}
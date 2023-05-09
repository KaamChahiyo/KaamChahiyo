import { useState, useEffect } from "react";

let form = null;

export default function Main() {
    const [params, setParams] = useState({
        amt: 100,
        psc: 0,
        pdc: 0,
        txAmt: 0,
        tAmt: 100,
        pid: process.env.ESEWA_TEST_PID,
        scd: process.env.ESEWA_SCD,
        su: "http://localhost:3000/payment/success",
        fu: "http://localhost:3000/payment/failed"
    });

    useEffect(() => {
        post();
    });

    const post = () => {
        form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", process.env.ESEWA_URL);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        // form.submit();
    };

    const handleSubmit = () => {
        form.submit();
    };

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

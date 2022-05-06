'use strict';

ready(function () {
    // console.log("Loaded script");
    function ajaxPost(url, cb, data) {
        let param = typeof data == "string" ? data : Object.keys(data).map(
            function (elem) { return encodeURIComponent(elem) + "=" + encodeURIComponent(data[elem]); }
        ).join('&');

        // console.log("POST param: ", param);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                cb(this.responseText);
            } else {
                // console.log(this.status);
            }
        };
        xhr.open("POST", url);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(param);
    }

    var login = async function (e) {
        e.preventDefault();
        let usr = document.getElementById("username").value;
        let pass = document.getElementById("password").value;
        try {
            let response = await fetch("/login", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    'username': usr,
                    'password': pass
                })
            });

            if (response.status == 200) {
                let data = await response.text();
                if (data) {
                    let parsed = JSON.parse(data);
                    // console.log(parsed);
                    if (parsed.status == 'failure') {
                        document.getElementById("errorMsg").innerText = parsed.msg;
                    } else {
                        window.location.replace("/home");
                    }
                }
            } else {
                // console.log(response.status);
                // console.log(response.statusText);
            }
        } catch (error) {
            // console.log(error);
        }
    };

    document.getElementById("login-form").addEventListener('submit', login);
});

function ready(cb) {
    if (document.readyState != "loading") {
        cb();
        // console.log("ready completed");
    } else {
        document.addEventListener("DOMContentLoaded", cb);
        // console.log("evoked listener");
    }
}
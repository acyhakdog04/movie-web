const preQuery1 = document.getElementById("pre-query1")
const preQuery2 = document.getElementById("pre-query2")
const preQuery3 = document.getElementById("pre-query3")

const queryInput = document.getElementById("xpathQuery")

preQuery1.addEventListener("click", () => {
    queryInput.value = "//movieTitle"; 
});

preQuery2.addEventListener("click", () => {
    queryInput.value = "/movies/movie[2]/director"; 
});

preQuery3.addEventListener("click", () => {
    queryInput.value = "/movies/movie[4]/actors/actor"; 
});

const loadXML = (filename) => {
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseXML;
}

const applyXSLT = () => {
    let xml = loadXML("movies.xml");
    let xslt = loadXML("movies.xsl");

    if (window.ActiveXObject || "ActiveXObject" in window) {
        // For old browsers
        let ex = xml.transformNode(xslt);
        document.getElementById("output").innerHTML = ex;
    }else if (document.implementation && document.implementation.createDocument) {
        // For modern browsers
        let xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslt);
        let resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById("output").appendChild(resultDocument);
    }
}

const queryXML = () => {
    let xml = loadXML("movies.xml");
    let query = document.getElementById("xpathQuery").value;    
    let output = document.getElementById("queryOutput");
    output.innerHTML = ""; // Clear results
    const ul = document.createElement("ul");    
    try {
        let result = xml.evaluate(
            query,
            xml,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE, 
            null
        );

        let node = result.iterateNext();

        while (node) {
            let values = node.textContent.trim().split(/\s{2,}|\n+/).filter(Boolean);

            values.forEach(value => {
                const li = document.createElement("li");
                li.textContent = value;
                ul.appendChild(li);
            });

            node = result.iterateNext();
        }

        output.appendChild(ul);
    } catch (e) {
        output.innerHTML = `<p style="color:red;">Error: ${e.message}</p>`;
    }
};


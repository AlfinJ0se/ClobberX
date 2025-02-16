function generateNestedIframes(input) {
    const names = input.split('.');
    let html = '';
    
    for (let i = names.length - 1; i >= 0; i--) {
        if(i==0){
            html = `<iframe name="${names[i]}" srcdoc="${html}"></iframe>`;
        }
        else{
            html = `&amp;lt;iframe name=&amp;quot;${names[i]}&amp;quot; srcdoc=&amp;quot;${html}&amp;quot;&amp;gt;&amp;lt;/iframe&amp;gt;`;
        }

    }
    
    return html;
}

// Example usage:
const input = "a.b.c.d";
const iframeHTML = generateNestedIframes(input);
console.log(iframeHTML);
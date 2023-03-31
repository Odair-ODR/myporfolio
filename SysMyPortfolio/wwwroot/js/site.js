
export async function getView(href) {
    const uri = href
    const init = {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'text/html'
        }
    }
    const response = await fetch(uri, init)
    const html = await response.text()
    return html
}

export async function getFileCVFromAzure() {
    try {
        const uri = "/Home/DownloaCVFromAzure";
        const init = {
            method: 'GET'
        }
        const response = await fetch(uri, init);
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.log(error.message)
    }
}
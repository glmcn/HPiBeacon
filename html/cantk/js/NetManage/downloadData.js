function GNDownloadData (argument) {
} 

GNDownloadData.prototype.m_pGNDownloadData = null;
GNDownloadData.create = function(){
	if (this.m_pGNDownloadData ==null) {
		this.m_pGNDownloadData = new GNDownloadData();
	};
	return this.m_pGNDownloadData;
}

GNDownloadData.prototype.init = function(imageID) {
	var fileName = imageID;
    // XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();
    xhr.open("get",httpHost+"download/?file=" + fileName, true);
    xhr.onreadystatechange = function () {
        if(xhr.readyState==4)
        {
            alert(xhr.responseText);
        }
    };

    xhr.onerr = function(argument) {
        alert(argument);
    };

    xhr.send();
};

// var pp = new GNDownloadData();
// pp.init(1.png);
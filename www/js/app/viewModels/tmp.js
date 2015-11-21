/**
 * Created by Yukai on 2015/9/5.
 */
self.btnBatchUploadClick = function(){
    var file = self.fileInput();
    var xhr = new XMLHttpRequest();
    xhr.file = file; // not necessary if you create scopes like this
    xhr.addEventListener('progress', function(e) {
        var done = e.position || e.loaded, total = e.totalSize || e.total;
        console.log('xhr progress: ' + (Math.floor(done/total*1000)/10) + '%');
    }, false);
    if ( xhr.upload ) {
        xhr.upload.onprogress = function(e) {
            var done = e.position || e.loaded, total = e.totalSize || e.total;
            console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done/total*1000)/10) + '%');
        };
    }
    xhr.onreadystatechange = function(e) {
        if ( 4 == this.readyState ) {
            console.log(['xhr upload complete', e]);
        }
    };
    xhr.open('post', uploadFileURL, true);
    xhr.send(file);
};



$.ajax({
    headers: {
        'Content-Type': 'application/json'
    },
    type:"POST",
    crossDomain: true,
    data: fileInput,
    url:uploadFileURL,
    enctype: "multipart/form-data",
    success: function(result){
        self.waitApproveList.remove(obj);
        //remove user from approval list when get approved
        /*_.each(self.waitApproveList(), function(approvalList){
         //TODO use hardcode here for test, later need to use result.id
         if(approvalList.id == mouseClickUserId){
         _.remove(this);
         }
         });*/
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
    }
})
    .always(function(){
    });
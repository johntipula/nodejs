var mine_types = {
   'js' : 'text/javascript',
   'html' : 'text/html',
   'css' : 'text/css',
   'jpg' : 'image/jpg',
   'gif' : 'image/gif',
   'png' : 'image/png'
};
function create(http, url, fs){
   http.createServer(function(petition, answer){
      var path_to_file = walking_Back_Archive(url, petition);
      fileRead(fs, path_to_file, function(number, content_archive){
         if(number === 404){
            answer.writeHead(number, 'text/plain');
            answer.end('Error 404. The link does not exist or has ceased to exist.');
        }else if(number === 500){
            answer.writeHead(number, 'text/plain');
            answer.end('Internal error.');
        }else{
            var extension = path_to_file.split('.').pop();
            var mine_type = mine_types[extension];
            answer.writeHead(number, {'Content-Type': mine_type});
            answer.end(content_archive);
        }
    })
  }).listen(3000, '127.0.0.1');
}
function walking_Back_Archive(url, petition){
   var path_name = (url.parse(petition.url).pathname == '/') ? '/index.html' : url.parse(petition.url).pathname;
   var path_to_file = 'content/' + path_name;
   return path_to_file;
}
function fileRead(fs, path_to_file, callback){
   fs.exists(path_to_file, function(exists){
      if(exists){
         fs.readFile(path_to_file, function(error, content_archive){
            if(error){
               callback(500, null);
           }else{
               callback(200, content_archive);
           }
       });
     }else{
         callback(404, null);
     }
 });
}
exports.create = create;
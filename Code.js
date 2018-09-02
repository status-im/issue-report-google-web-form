var ISSUE_TYPE_COLUMN = 0;
var DESCRIPTION_COLUMN = 1;
var GOOGLE_DISK_URL_COLUMN = 2;

var scriptProperties = PropertiesService.getScriptProperties();

function valueByIdx(responses, columnIdx) {
  return responses[columnIdx].getResponse();
}

function onFormSubmit(e) {
  var itemResponses = e.response.getItemResponses();
  
  var title = "StatusIm Desktop issue";
  var fileURL = "\n https://drive.google.com/open?id=";
  if (valueByIdx(itemResponses, GOOGLE_DISK_URL_COLUMN).constructor === Array) {
    fileURL = fileURL + valueByIdx(itemResponses, GOOGLE_DISK_URL_COLUMN).join(fileURL);
  } else {
    fileURL = fileURL + valueByIdx(itemResponses, GOOGLE_DISK_URL_COLUMN);
  }
  var body = "<strong>Issue type:</strong> " + valueByIdx(itemResponses, ISSUE_TYPE_COLUMN) + "\n" +
             "<strong>Description:</strong> " + valueByIdx(itemResponses, DESCRIPTION_COLUMN) + "\n" +
             "<strong>Uploaded files:</strong> " + fileURL + "\n";
  
  var payload = {
    "title": title,
    "body": body
  };
   
  var options = {
    "method": "POST",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  
  var response = UrlFetchApp.fetch("https://api.github.com/repos/status-im/status-react-desktop-reports/issues?access_token=" + scriptProperties.getProperty('GitHubToken'), options);
}


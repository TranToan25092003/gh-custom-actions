const core = require("@actions/core");
const github = require("@actions/github"); // this libary to get more extra data from github
const exec = require("@actions/exec");

const run = () => {
  // get inputs
  const bucket = core.getInput("bucket", { required: true });

  const bucketRegion = core.getInput("bucket-region", { required: true });

  const distFolder = core.getInput("dist-folder", { required: true });

  // upload to s3
  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

  const webUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

  core.setOutput("URL", webUrl);
};

run();

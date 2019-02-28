let mobilenet;
let classifier;
// Camera Setting
let label = 'Loading the model';
let video = document.querySelector('#camera-stream');

// Classify Train Test
function classify() {
	classifier.classify(gotResults);
}

// STATUS
// model
function modelReady() {
	select('#modelStatus').html('Model Ready!!');
	classifier.load('model.json', customModelReady);
}

function customModelReady() {
	console.log('Custom Model is Ready');
}

// camera
function videoReady() {
	select('#videoStatus').html('Video ready!');
	classifier.classify(gotResults);
}

function setup() {
	noCanvas();
	// Extract PreTrain features from MobileNet
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);

	// Create a new classifier using those features and give the video we want to use
	classifier = mobilenet.classification(video, videoReady);
	setupButtons();
}

// A util function to create UI buttons
function setupButtons() {
	// Predict Button
	buttonPredict = select('#buttonPredict');
	buttonPredict.mouseClicked(classify);

	// Load model
	loadBtn = select('#load');
	loadBtn.changed(function() {
		classifier.load(loadBtn.elt.files, function() {
			select('#modelStatus').html('Custom Model Loaded!');
		});
	});

	addList = select('.predict');
}

// Show the results
function gotResults(err, result) {
	if (err) {
		console.error(err);
	}
	let output = result.split(' - ');
	let name = output[0];
	let price = output[1];
	select('#name').html(name);
	select('#price').html('- Rp.' + price);
	classify();
}

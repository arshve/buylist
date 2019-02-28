let mobilenet;
let classifier;
// Idle Config
// let idle;
// Camera Setting
let video = document.querySelector('#camera-stream');

// MODEL STATUS
function modelReady() {
	console.log('Load Costume Model');
	classifier.load('model.json', customModelReady);
}

function customModelReady() {
	select('#modelStatus').html('Model Ready!!');
	console.log('Costume Model Ready to Use');
}

// camera
function videoReady() {
	select('#videoStatus').html('Video ready!');
}

function setup() {
	noCanvas();

	// Extract PreTrain features from MobileNet
	mobilenet = ml5.featureExtractor('MobileNet', modelReady);

	// Create a new classifier using those features and give the video we want to use
	classifier = mobilenet.classification(video, videoReady);
	setupButtons();
}

// Classify Train Test
function classify() {
	classifier.classify(gotResults);
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
	select('#name').html('Add <strong>' + name + '</strong>');
	select('#price').html('- Rp.' + price + ' to your list');
	classify();
}

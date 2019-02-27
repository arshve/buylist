let featureExtractor;
let classifier;
let loss;
let addButton;
let item;
let itemName;
let itemPrice;
// Camera Setting
let video = document.querySelector('#camera-stream');

function setup() {
	noCanvas();
	// let camera = select('.camera');
	// video = createCapture(VIDEO);
	// video.parent(camera).addClass('camera-stream');
	// Extract PreTrain features from MobileNet
	featureExtractor = ml5.featureExtractor('MobileNet', { numClasses: 6 }, modelReady);

	// Create a new classifier using those features and give the video we want to use
	classifier = featureExtractor.classification(video, videoReady);

	setupButtons();
}

// STATUS
// model
function modelReady() {
	select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

// camera
function videoReady() {
	select('#videoStatus').html('Video ready!');
}

// Classify Train Test
function classify() {
	classifier.classify(gotResults);
}

// A util function to create UI buttons
function setupButtons() {
	// Add Button
	addButton = select('#addBut');
	addButton.mouseClicked(function() {
		let num = 0;
		// Grab Information
		itemName = select('#nama').value();
		itemPrice = select('#harga').value();
		item = select('.item');

		// Create Add Image Div
		let image = createElement('div').addClass('col-xl-3 col-sm-4 col-6');
		let div1 = createElement('div').addClass('stats stats-dark');
		div1.parent(image);
		let div2 = createElement('h3', itemName).addClass('stats-title');
		div2.parent(div1);
		let div3 = createElement('div').addClass('stats-content');
		div3.parent(div1);
		let div4 = createElement('div').addClass('stats-data');
		div4.parent(div3);
		let div5 = createElement('div', num).addClass('stats-number');
		div5.parent(div4);

		// Collecting image
		image.parent(item).mouseClicked(function() {
			num++;
			let data = classifier.addImage(itemName + ' - ' + itemPrice);
			div5.html(num);
			console.log(data);
		});
		select('#nama').value('');
		select('#harga').value('');
	});

	// Train Button
	train = select('#train');
	train.mouseClicked(function() {
		classifier.train(function(lossValue) {
			if (lossValue) {
				loss = lossValue;
				select('#loss').html('Loss: ' + loss);
			} else {
				select('#loss').html('Done Training! Final Loss: ' + loss);
			}
		});
	});

	// Predict Button
	buttonPredict = select('#buttonPredict');
	buttonPredict.mouseClicked(classify);

	// Save model
	saveBtn = select('#save');
	saveBtn.mouseClicked(function() {
		classifier.save();
	});

	// Load model
	loadBtn = select('#load');
	loadBtn.changed(function() {
		classifier.load(loadBtn.elt.files, function() {
			select('#modelStatus').html('Custom Model Loaded!');
		});
	});
}

// Show the results
function gotResults(err, result) {
	if (err) {
		console.error(err);
	}
	select('#result').html(result);
	classify();
}

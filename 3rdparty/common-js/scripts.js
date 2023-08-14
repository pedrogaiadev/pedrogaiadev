(function ($) {

    "use strict";



	// LINE PROGRESS BAR
	enableLineProgress();
	
	// RADIAL PROGRESS BAR
	enableRadialProgress();
	
	// ACCORDIAN
	panelAccordian();

	$(window).on('load', function(){
		
		// ISOTOPE PORTFOLIO WITH FILTER
		if(isExists('.portfolioContainer')){
			var $container = $('.portfolioContainer');
			$container.isotope({
				filter: '*',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});
		 
			$('.portfolioFilter a').click(function(){
				$('.portfolioFilter .current').removeClass('current');
				$(this).addClass('current');
		 
				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				 });
				 return false;
			}); 
		}
	
	});
	
	
	$('a[href="#"]').on('click', function(event){
		return;
	});
	
	
	if ( $.isFunction($.fn.fluidbox) ) {
		$('a').fluidbox();
	}
	
	var countCounterUp = 0;
	
	var a = 0 ;
	
	countCounterUp = enableCounterUp(countCounterUp);
	
	$(window).on('scroll', function(){
		
		countCounterUp = enableCounterUp(countCounterUp);
	
	});
	
	
})(jQuery);

function panelAccordian(){
	
	var panelTitle = $('.panel-title');
	panelTitle.on('click', function(){
		$('.panel-title').removeClass('active');
		$(this).toggleClass('active');
		
	});
	
}

function enableRadialProgress(){
	
	$(".radial-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Circle(this, {
			color: '#aaa',
			strokeWidth: 3,
			trailWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			text: {
				
			},
			from: { color: '#aaa', width: 1 },
			to: { color: '#fd4602', width: 3 },
			// Set default step function for all animate calls
			step: function(state, circle) {
				circle.path.setAttribute('stroke', state.color);
				circle.path.setAttribute('stroke-width', state.width);

				var value = Math.round(circle.value() * 100);
				if (value === 0) {
					circle.setText('');
				} else {
					circle.setText(value);
				}

			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableLineProgress(){
	
	$(".line-progress").each(function(){
		var $this = $(this),
			progPercent = $this.data('prog-percent');
			
		var bar = new ProgressBar.Line(this, {
			strokeWidth: 1,
			easing: 'easeInOut',
			duration: 1400,
			color: '#fd4602',
			trailColor: '#eee',
			trailWidth: 1,
			svgStyle: {width: '100%', height: '100%'},
			text: {
				style: {
					
				},
			},
			from: {color: '#ec7e58'},
			to: {color: '#ED6A5A'},
			step: (state, bar) => {
				bar.setText(Math.round(bar.value() * 100) + ' %');
			}
		});
		
		$(this).waypoint(function(){
		   bar.animate(progPercent);  
		},{offset: "90%"})
		
	});
}

function enableCounterUp(a){
	
	var counterElement;
	
	if(isExists('#counter')){ counterElement = $('#counter'); }
	else{ return; }
		
	var oTop = $('#counter').offset().top - window.innerHeight;
	if (a == 0 && $(window).scrollTop() > oTop) {
		$('.counter-value').each(function() {
			var $this = $(this),
				countDuration = $this.data('duration'),
				countTo = $this.attr('data-count');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			},{

				duration: countDuration,
				easing: 'swing',
				step: function() {
					$this.text(Math.floor(this.countNum));
				},
				complete: function() {
					$this.text(this.countNum);
				}

			});
		});
		a = 1;
	}

	return a;
}

function afterModalTransition(e) {
	e.setAttribute("style", "display: none !important;");
}

function isExists(elem){
	if ($(elem).length > 0) { 
		return true;
	}
	return false;
}

const skillDisplayTextDefaultText = $('.skillDisplayText').text();

$('.skillIcon').find('img').on('mouseover', (e) =>
{
	let skillDescription = $(e.target).attr('alt');

	const skillDisplayText = $('.skillDisplayText');

	const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

	const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

	const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

	$(e.target).attr('src', skillDisplayImageHighlightSource.replace('PLACEHOLDER', target));

	skillDisplayText.text(skillDescription);

	skillDisplayText.removeClass('animate__animated animate__flipInX');

	skillDisplayText.css('color', 'var(--lightOrange)');
	skillDisplayText.css('font-weight', '600');

	setTimeout(() =>
	{
		skillDisplayText.addClass('animate__animated animate__flipInX');
	}, 1);

}).on('mouseout', (e) =>
{
	let skillDescription = $(e.target).attr('alt');

	const skillDisplayText = $('.skillDisplayText');

	const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

	const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

	const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

	$(e.target).attr('src', skillDisplayImageSource.replace('PLACEHOLDER', target));

	skillDisplayText.text(skillDisplayTextDefaultText);

	skillDisplayText.removeClass('animate__animated animate__flipInX');

	skillDisplayText.css('color', 'white');
	skillDisplayText.css('font-weight', '500');

	setTimeout(() =>
	{
		skillDisplayText.addClass('animate__animated animate__flipInX');
	}, 1);

});

function setVideoModal(
	title,
	company,
	description,
	link,
	duration,
	responsibilitiesList,
	platformList,
	skillList){
	$("#durationVideo").text(duration);
	$("#companyVideo").text(company);
	$("#videoModal h3 b").text(title);
	$("#videoModal h6").html(processDescription(description));

	if($(responsibilitiesList).length > 0)
	{
		$('.responsibilitiesTitle').show();

		$.each(responsibilitiesList, function(index) {
			var liElement = $("<li class='responsibilitiesListElement'>").text(responsibilitiesList[index]);
			$("#modalResponsibilitiesListClassVideo").append(liElement);
		});
	}
	else
	{
		$('.responsibilitiesTitle').hide();
	}

	if($(platformList).length > 0)
	{
		getPlatformInformation(platformList);
	}

	if($(skillList).length > 0)
	{
		setSkillInformation(skillList)
	}

	if (link.includes('youtube'))
	{
		if (!$('#idiframeVideo').hasClass('embed-responsive embed-responsive-16by9'))
		{
			$('#idiframeVideo').addClass('embed-responsive embed-responsive-16by9');
		}

		$('<iframe />');
		$('<iframe />', {
			class: 'embed-responsive-item',
			id: 'modaliframe',
			allowFullscreen: '',
			src: link
		}).appendTo('#idiframeVideo');
	}
	else
	{
		if ($('#idiframeVideo').hasClass('embed-responsive embed-responsive-16by9'))
		{
			$('#idiframeVideo').removeClass('embed-responsive embed-responsive-16by9');
		}

		const imageLink = link;

		let imageElement = $("<img src=''>");

		imageElement.attr('src', imageLink);

		$("#idiframeVideo").append(imageElement);
	}

	const skillListDisplayTextDefaultTextVideo = $('.skillListDisplayTextVideo').text();

	$('.skillModalIcon').find('img').on('mouseover', (e) =>
	{
		let skillDescription = $(e.target).attr('alt');

		const skillDisplayText = $('.skillListDisplayTextVideo');

		const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

		const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

		const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

		$(e.target).attr('src', skillDisplayImageHighlightSource.replace('PLACEHOLDER', target));

		skillDisplayText.text(skillDescription);

		skillDisplayText.removeClass('animate__animated animate__flipInX');

		skillDisplayText.css('color', 'var(--lightOrange)');
		skillDisplayText.css('font-weight', '600');

		setTimeout(() =>
		{
			skillDisplayText.addClass('animate__animated animate__flipInX');
		}, 1);

	}).on('mouseout', (e) =>
	{
		let skillDescription = $(e.target).attr('alt');

		const skillDisplayText = $('.skillListDisplayTextVideo');

		const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

		const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

		const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

		$(e.target).attr('src', skillDisplayImageSource.replace('PLACEHOLDER', target));

		skillDisplayText.text(skillListDisplayTextDefaultTextVideo);

		skillDisplayText.removeClass('animate__animated animate__flipInX');

		skillDisplayText.css('color', 'white');
		skillDisplayText.css('font-weight', '500');

		setTimeout(() =>
		{
			skillDisplayText.addClass('animate__animated animate__flipInX');
		}, 1);

	});
}

function setImageModal(
	title,
	company,
	description,
	duration,
	platformList,
	imageList,
	descriptionList,
	skillList)
{
	$("#durationImage").text(duration);
	$("#companyImage").text(company);
	$("#imageModal h3 b").text(title);
	$("#imageModal h6").html(processDescription(description));

	if($(imageList).length === $(descriptionList).length)
	{
		$('#idiframeImage').carousel('pause');

		linkImageDescriptionInformation(imageList, descriptionList);

		$('.carousel-description').append($('<p></p>').text(descriptionList[0]));
	}

	$('#idiframeImage').on('slid.bs.carousel',function ()
	{
		var activeImageSource = $('.carousel-inner').find('.active').find('img').attr('src');

		var descIndex = imageList.findIndex((img) => img === activeImageSource);

		var carouselImageDescription = $('<p></p>');

		carouselImageDescription.text(descriptionList[descIndex]);

		$('.carousel-description').empty();
		$('.carousel-description').append(carouselImageDescription);
	})

	if($(platformList).length > 0)
	{
		getPlatformInformation(platformList);
	}

	if($(skillList).length > 0)
	{
		setSkillInformation(skillList)
	}

	const skillListDisplayTextDefaultTextImage = $('.skillListDisplayTextImage').text();

	$('.skillModalIcon').find('img').on('mouseover', (e) =>
	{
		let skillDescription = $(e.target).attr('alt');

		const skillDisplayText = $('.skillListDisplayTextImage');

		const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

		const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

		const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

		$(e.target).attr('src', skillDisplayImageHighlightSource.replace('PLACEHOLDER', target));

		skillDisplayText.text(skillDescription);

		skillDisplayText.removeClass('animate__animated animate__flipInX');

		skillDisplayText.css('color', 'var(--lightOrange)');
		skillDisplayText.css('font-weight', '600');

		setTimeout(() =>
		{
			skillDisplayText.addClass('animate__animated animate__flipInX');
		}, 1);

	}).on('mouseout', (e) =>
	{
		let skillDescription = $(e.target).attr('alt');

		const skillDisplayText = $('.skillListDisplayTextImage');

		const skillDisplayImageSource = "images/Icons/PLACEHOLDER.png";

		const skillDisplayImageHighlightSource = "images/Icons/Highlight/PLACEHOLDER.png";

		const target = iconImageSourceHighlightFinder($(e.target).attr('src'));

		$(e.target).attr('src', skillDisplayImageSource.replace('PLACEHOLDER', target));

		skillDisplayText.text(skillListDisplayTextDefaultTextImage);

		skillDisplayText.removeClass('animate__animated animate__flipInX');

		skillDisplayText.css('color', 'white');
		skillDisplayText.css('font-weight', '500');

		setTimeout(() =>
		{
			skillDisplayText.addClass('animate__animated animate__flipInX');
		}, 1);

	});
}

function processDescription(description)
{
	return description.replace(/\n/g, '<br>');
}

function getPlatformInformation(platforms)
{
	const imageLink = 'images/Platforms/PLACEHOLDER.png';

	platforms.forEach(el =>
	{
		let platformElement = $("<a href='' target='_blank'><img src='' class='platformSmallIcon'></a>");

		let imageSource = `${imageLink.replace('PLACEHOLDER', el[0])}`

		platformElement.find('img').attr("src", imageSource);

		platformElement.find('img').on('error', (e) =>
		{
			platformElement.find('img').attr('src', imageLink);
		})

		el[1].includes('http') ? platformElement.attr("href", el[1]) : platformElement.attr("href", 'javascript:void(0)');

		if(!el[1].includes('http'))
		{
			platformElement.attr("href", 'javascript:void(0)');
			platformElement.removeAttr("target");
			platformElement.css('cursor', 'default');
		}
		else
		{
			platformElement.attr("href", el[1]);
		}

		$(".platformContainer").append(platformElement);
	});
}

function setSkillInformation(skills)
{
	const imageLink = 'images/Icons/PLACEHOLDER.png';
	const altError = "ERROR!";

	skills.forEach(el =>
	{
		let skillDivElement = $('<div class="skillModalIcon"></div>');

		let skillImageElement = $('<img src="" alt="">');

		let imageSource = `${imageLink.replace('PLACEHOLDER', el)}`

		let altSource;

		switch (el)
		{
			case "AWS":
				altSource = "Amazon Web Services";
				break;
			case "FMOD":
				altSource = "FMOD";
				break
			case "GADMOB":
				altSource = "Google AdMob";
				break;
			case "GIT":
				altSource = "Git Version Control";
				break;
			case "JENKINS":
				altSource = "Jenkins";
				break;
			case "PLASTIC":
				altSource = "Plastic SCM";
				break;
			case "PS5":
				altSource = "Playstation® 5 DevNet";
				break;
			case "STEAM":
				altSource = "Steam Platform";
				break;
			case "UNITY":
				altSource = "Unity Engine";
				break;
			case "UNREAL":
				altSource = "Unreal Engine";
				break;
			case "VIRTUALBOX":
				altSource = "Oracle Virtual Box";
				break;
			case "WWISE":
				altSource = "Audiokinetic Wwise";
				break;
			default:
				altSource = "Not Found!";
				break
		}

		skillImageElement.attr("src", imageSource);

		skillImageElement.attr("alt", altSource);

		skillImageElement.on('error', (e) =>
		{
			skillImageElement.attr('src', imageLink);
			skillImageElement.attr("alt", altError);
		});

		skillDivElement.append(skillImageElement);

		$(".skillListContainer").append(skillDivElement);
	});
}

function linkImageDescriptionInformation(imageList, descriptionList)
{
	$.each(imageList, function (index, image)
	{
		var image = image;
		var activeClass = index === 0 ? 'active' : '';

		addImageToCarousel(activeClass, image);
	});
}

function addImageToCarousel(activeClass, image)
{
	var carouselItem = $('<div class="carousel-item"></div>');

	carouselItem.addClass(activeClass);

	var imageElement = $('<img src="" class="d-block w-100">');

	imageElement.attr('src', image);

	carouselItem.append(imageElement);

	$('.carousel-inner').append(carouselItem);
}

$("#videoModal").on('hidden.bs.modal', function (e)
{
	$("#videoModal iframe").remove();
	$("#modalResponsibilitiesListClassVideo").empty();
	$(".platformContainer").empty();
	$("#idiframeVideo").empty();
	$(".skillListContainer").empty();
});

$("#imageModal").on('hidden.bs.modal', function (e)
{
	$("#imageModal iframe").remove();
	$(".platformContainer").empty();
	$(".carousel-inner").empty();
	$(".carousel-description").empty();
	$(".skillListContainer").empty();
});

function iconImageSourceHighlightFinder(source)
{
	const startSubStr = source.lastIndexOf("/") + 1;
	const endSubStr = source.lastIndexOf(".");

	 return source.substring(startSubStr, endSubStr);
}
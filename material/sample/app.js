$(function(){
	registerRoute('\\w+/show', function(id, param){
		for(var i in window.viewModel.blocks()){
			var block = window.viewModel.blocks()[i];
			if(block.id() == id){
				block.show();
				break;
			}
		}
	});
	
	registerRoute('\\w+/hide', function(id, param){
		for(var i in window.viewModel.blocks()){
			var block = window.viewModel.blocks()[i];
			if(block.id() == id){
				block.hide();
				break;
			}
		}
	});
	
	registerRoute('\\w+/\\w+', function(id, subId){
		for(var i in window.viewModel.blocks()){
			var block = window.viewModel.blocks()[i];
			if(block.id() == id){
				for(var j in block.blocks()){
					var subBlock = block.blocks()[j];
					if(subBlock.id() == subId){
						subBlock.style('selected');
					}
					else{
						subBlock.style('un-selected');
					}
				}
				break;
			}
		}
	});
	
	var object = {
		blocks: [
			{text: 'Block1', style: 'red', id: 1 ,blocks: [
				{text: 'Block 1 1', id: 11},
				{text: 'Block 1 2', id: 12},
				{text: 'Block 1 3', id: 13}
			]},
			{text: 'Block2', style: 'red', id: 2},
			{text: 'Block3', style: 'red', id: 3},
			{text: 'Block4', style: 'red', id: 4},
			{text: 'Block5', style: 'red', id: 5, blocks: [
				{text: 'Block 5 1', id: 51},
				{text: 'Block 5 2', id: 52}
			]},
			{text: 'Block6', style: 'red', id: 6},
			{text: 'Block7', style: 'red', id: 7}
		]
	}
	
	var template = {name: 'div', children:[
		{$: '<input type="button" value="red">', bind: {setRed: click}},
		{$: '<input type="button" value="blue">', bind: {setBlue: click}},
		{$: '<input type="button" value="green">', bind: {setGreen: click}},
		{$: '<input type="button" value="add">', bind: {add: click}},
		{$: '<input type="button" value="save">', bind: {save: click}},
		{name: 'div', foreach: 'blocks', children: [
			{$: '<div class="block">',  bind: {id: id, text: text, style: className, click: click}},
			{name: 'div', foreach: 'blocks', children: [
				{$: '<div class="sub-block">', bind: {id: id, text: text, style: className, click: click}}
			]}
		]}
	]};
	
	function ViewModel(model){
		this.blocks = observableArray();
		var self = this;
		
		for(var i in model.blocks){
			this.blocks.push(new BlockViewModel(model.blocks[i]));
		}
		
		this.setBlue = function(){
			setStyle('blue');
		}
		this.setGreen = function(){
			setStyle('green');
		}
		this.setRed = function(){
			setStyle('red');
		}
		
		this.add = function(){
			self.blocks.push(new BlockViewModel({text: 'bla bla bla', style: self.blocks()[0].style(), id: Math.random().toString()}));
		}
		
		this.save = function(){
			var object = {};
			object.blocks = [];
			
			var blocks = self.blocks();
			for(var i in blocks){
				object.blocks.push(blocks[i].getModel());
			}
			
			console.log(object);
		}
		
		function setStyle(style){
			var blocks = self.blocks();
			for(var i in blocks){
				blocks[i].style(style);
			}
		}
	}
	
	function BlockViewModel(block){
		this.text = observable(block.text);
		this.style = observable(block.style);
		this.id = observable(block.id);
		this.blocks = observableArray();
		var hidden = false;
		
		var self = this;
		
		for(var i in block.blocks){
			this.blocks.push(new SubBlockViewModel(block.blocks[i], this));
		}
		
		this.click = function(block){
			navigateTo(hidden ? self.id() + '/show' : self.id() + '/hide');
			hidden = !hidden;
		}
		
		this.hide = function(){
			var blocks = self.blocks();
			for(var i in blocks){
				blocks[i].style('hidden');
			}
		}
		
		this.show = function(){
			var blocks = self.blocks();
			for(var i in blocks){
				blocks[i].style('show');
			}
		}
		
		this.getModel = function(){
			// Извлекаем данные с вью-модели
			var object = {text: self.text(), style: self.style(), id: self.id()};
			object.blocks = [];
			var blocks = self.blocks();
			for(var i in blocks){
				object.blocks.push(blocks[i].getModel());
			}
			return object;
		}
	}
	
	function SubBlockViewModel(subBlock, parent){
		this.text = observable(subBlock.text);
		this.style = observable('');
		this.id = observable(subBlock.id);
		this.parent = parent;
		var self = this;
		
		this.getModel = function(){
			return {text: self.text(), id: self.id()};
		}
		
		this.click = function(){
			navigateTo(parent.id() + '/' + self.id());
		}
	}
	
	var viewModel = window.viewModel = new ViewModel(object);
	generateMarkup(template, $('#application'), viewModel);
	setupNavigation();
});
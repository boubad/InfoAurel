// itembase.js
import {computedFrom} from 'aurelia-framework';
import {Promise} from 'bluebird';
//
import {BaseElement} from '../resources/baseelement';
//
export class ItemBase extends BaseElement {
	constructor(eventAggregator,dataService,userInfo,model){
		super(eventAggregator,dataService,userInfo);
		this.modelItem = model;
		this.add_mode = false;
		this.old_elem = null;
		this.current_item = this.dataService.create_item({type:this.modelItem.type});
		this._current_element = null;
		this.next_key = null;
		this.prev_key = null;
		this.start_key = null;
		this.itemsPerPage = 16;
		this.first_key = null;
		this.elements = [];
		this.skip = 0;
		this.canNextPage = false;
		this.canPrevPage = false;
	}// constructor
	activate() {
    if (this.elements.length < 1){
			this.refreshAll();
		}
  }
	create_item(){
		return this.dataService.create_item({type:this.modelItem.type});
	}// create_item
	addNew(){
		this.old_elem = this.current_element;
		this.current_element = null;
		this.add_mode = true;
	}// addNew
	cancel_add(){
		this.current_element = this.old_elem;
		this.add_mode = false;
	}// cancel_add
	change_current(){
		let ep = this.current_element;
		if (ep === null){
			this.current_item = this.create_item();
      this.post_change_item();
			return;
		}
		let id = ((ep.id !== undefined) && (ep.id !== null)) ? ep.id : null;
		if (id === null){
			this.current_item = this.create_item();
      this.post_change_item();
			return;
		}
		var self = this;
		this.dataService.get_item_by_id(id,true).then((r)=>{
			self.current_item = ((r !== undefined) && (r !== null)) ? r : self.create_item();
      self.post_change_item();
		},(err)=>{
			self.current_item = self.create_item();
      self.post_change_item();
		});
	}// change_current
  post_change_item(){
    this.update_menu();
  }// post_change_item
  get current_element(){
    return this._current_element;
  }
  set current_element(s){
    this._current_element = ((s !== undefined) && (s !== null)) ? s : null;
    this.change_current();
  }
	create_start_key(){
		return [];
	}
  @computedFrom('elements')
  get hasElements(){
    return ((this.elements !== null) && (this.elements.length > 0));
  }
	@computedFrom('add_mode')
	get canAdd(){
		return (!this.add_mode);
	}
	@computedFrom('add_mode')
	get canCancel() {
		return this.add_mode;
	}
	@computedFrom('current_element')
	get canRemove(){
		let x = this.current_element;
		return ((x !== null) && (x.id !== undefined) && (x.rev !== undefined) &&
			(x.id !== null) && (x.rev !== null));
	}
	remove(){
		let item = this.current_item;
		if (item === null){
			return;
		}
		if (item.id === null){
			return;
		}
		if (window.confirm('Voulez-vous vraiment supprimer ' + item.id + '?')){
			let self = this;
		return this.dataService.remove_one_item(item).then((r)=>{
			self.refreshAll();
		},(err)=>{
			self.set_error(err);
		});
		}
	}// remove
	@computedFrom('current_item.is_storeable')
	get canSave(){
		let x = this.current_item;
		return (x !== null) && (x.is_storeable !== undefined) && (x.is_storeable == true);
	}
	save(){
			let item = this.current_item;
		if (item === null){
			return;
		}
		if (!item.is_storeable){
			return;
		}
		var self = this;
		return this.dataService.maintains_one_item(item).then((r)=>{
			if (item.rev !== null){
				self.refresh();
			} else {
				self.refreshAll();
			}
		},(err)=>{
			self.set_error(err);
		});
	}// save
	retrieve_one_avatar(item) {
		let service = this.dataService;
  	 return new Promise((resolve,reject) =>{
  	 	 let docid = item.avatardocid;
  	 	 let id = item.avatarid;
  	 	 item.url = null;
  	 	 if ((docid === null) || (id === null)){
  	 	 	resolve(item);
  	 	 } else {
  	 	 	service.get_docid_attachment(docid,id).then((blob)=>{
  	 	 		if ((blob !== undefined) && (blob !== null)){
  	 	 			resolve(item);
  	 	 		} else {
  	 	 			let x = window.URL.createObjectURL(blob);
  	 	 			item.url = x;
  	 	 			resolve(item);
  	 	 		}
  	 	 		},(err)=>{
  	 	 		resolve(item);
  	 	 		});
  	 	 }
  	 	});
  	}// retrieve_one_avatar
  	retrieve_avatars(elems)  {
  	let pp = [];
  	for (let elem of elems){
  		pp.push(this.retrieve_one_avatar(elem));
  	}
  	return Promise.all(pp);
  }// retrieve_avatars
  refresh() {
  	for (let elem of this.elements){
  		 let x = elem.url;
  		 if (x !== null){
  		 	window.URL.revokeObjectURL(x);
  		 	elem.url = null;
  		 }
  	}// elem
    let limit  = this.itemsPerPage;
    let skip = this.skip;
    let startKey = this.start_key;
    let first
    if (startKey === null){
      startKey = this.create_start_key();
    }
    let endKey = null;
    let descending = null;
    let bIncludeEnd = null;
    let bDoc = null;
    let bAttach = null;
    let model = this.modelItem;
    this.clear_error();
    let oldid = (this.current_item !== null) ? this.current_item.id : null;
    var self = this;
    return this.dataService.find_elements_range(model.index_name,startKey,
    	endKey, skip,limit,
    descending,bIncludeEnd,bDoc,bAttach).then((rr)=>{
      return self.retrieve_avatars(rr);
    }).then((dd)=>{
      if ((dd !== undefined) && (dd !== null)){
        self.prev_key = startKey;
        if (self.start_key === null){
        	self.canPrevPage = false;
        }
        let n = dd.length;
        if (n < limit){
          self.next_key = null;
          self.canNextPage = false;
        } else  if (n > 0) {
          self.skip = 0;
          let y = dd[0];
          self.prev_key = y.key;
          let x = dd[ n - 1];
          self.next_key = x.key;
          self.canNextPage = true;
        }
        self.elements = dd;
        let pSel  = null;
        if (oldid !== null){
          let n = dd.length;
          for (let i = 0; i < n; ++i){
            let x = dd[i];
            if (x.id == oldid){
              pSel = x;
              break;
            }
          }// i
        }// old
        self.current_element = pSel;
        if (dd.length < 1){
           self.addNew();
        }
      } else {
        self.elements = [];
        self.addNew();
      }
    });
  }// refresh
  refreshAll(){
  	this.skip = 0;
  	this.start_key = null;
  	this.refresh();
  }
  nextPage(){
  	if (this.next_key !== null){
  		this.skip = 1;
  		this.start_key = this.next_key;
  		this.refresh();
  	}
  }// nextPage
  prevPage(){
  	if (this.prev_key !== null){
  		this.skip = 0;
  		this.start_key = this.prev_key;
  		this.refresh();
  	}
  }// prevPage
}// class ItemBase

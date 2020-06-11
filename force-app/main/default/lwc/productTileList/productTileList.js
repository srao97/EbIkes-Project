import { LightningElement,api,track,wire } from 'lwc';
import{CurrentPageReference} from 'lightning/navigation'
import getProducts from '@salesforce/apex/ProductController.getProducts'
import{registerListener,unregisterAllListeners,fireEvent} from 'c/pubsub'
export default class ProductTileList extends LightningElement {
    @track pageNumber=1;
    @track pageSize;
    @track totalItemCount=0;
    @track filers={};
    @wire(CurrentPageReference) pageRef;
    @wire (getProducts,{filters:'$filters',pageNumber:'$pageNumber'})products;
    connectedCallback(){
        registerListener('filterChange',this.handleFilterChange,this);
    }

    handleProductSelected(event){
        fireEvent(this.pageRef,'productSelected',event.detail);
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    handleFilterChange(filters)
    {
        this.filters={...filters};
        this.pageNumber=1;
    }
    handlePreviousPage(){
        this.pageNumber=this.pageNumber-1;
    }
    handleNextPage(){
        this.pageNumber=this.pageNumber+1;
    }
}
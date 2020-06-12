import { LightningElement,wire } from 'lwc';
import{CurrentPageReference} from 'lightning/navigation';
import{getPicklistValues} from 'lightning/uiObjectInfoApi';
import CATEGORY_FIELD from '@salesforce/schema/Product__c.Level__c';
import LEVEL_FIELD from '@salesforce/schema/Product__c.Level__c';
import MATERIAL_FIELD from '@salesforce/schema/Product__c.Material__c';
import {fireEvent} from 'c/pubsub';
export default class ProductFilter extends LightningElement {
    searchKey='';
    maxPrice=10000;
    filters={
        searchKey:'',
        maxPrice:1000
    }
    @wire(CurrentPageReference) pageRef;
    @wire(getPicklistValues,{
        recordTypeId:'012000000000AAA',
        fieldApiName:CATEGORY_FIELD
    })categories;
    @wire(CurrentPageReference) pageRef;
    @wire(getPicklistValues,{
        recordTypeId:'012000000000AAA',
        fieldApiName:CATEGORY_FIELD
    })materials;
    @wire(CurrentPageReference) pageRef;
    @wire(getPicklistValues,{
        recordTypeId:'012000000000AAA',
        fieldApiName:CATEGORY_FIELD
    })levels;
    handleSearchKeyChange(event){
       this.filters.searchKey=event.target.value;
       this.delayedFireFilterChangeEvent();
    }
    handleMaxPriceChange(event){
            const maxPrice=event.target.value;
            this.filters.maxPrice=maxPrice;
            this.delayedFireFilterChangeEvent();
    }
    handleCheckboxChange(event){
        if(!this.filters.categories){
            this.filters.categories=this.categories.data.value.map(item => item.value);
            this.filters.levels=this.levels.data.value.map(item => item.value);
            this.filters.materials=this.materials.data.value.map(item => item.value);
            const value=event.target.dataset.value;
            const filterArray=this.filters(event.target.dataset.filter);
            if(event.target.checked)
            {
                if(!filterArray.includes(value)){
                    filterArray.push(value);
                }
                else{
                    this.filters(event.target.dataset.filter)==filterArray.filter(item=>item !==value)
                                 
                }
                fireEvent(this.pageRef, 'filterChange',this.filters);
                }
            }
        }
        delayedFireFilterChangeEvent()
            {
                fireEvent(this.pageRef,'filterChange',this.filters);
            }
}
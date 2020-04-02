<template>
    <picker mode="multiSelector" 
            :value="multiIndex" 
            :range="multiArray" 
            @change="handleValueChange"
            @columnchange="handleColumnChange">
        <slot></slot>
    </picker>
</template>

<script>
    const china_regions = require('./regions.json')
    const provinceArr = china_regions.map(item=>item.name)
	export default {
        props:{
            defaultRegions:{
                type:Array,
            }
        },
		data() {
			return {
                cityArr:[],
                districtArr:[],
                multiIndex: [0, 0, 0],
                isInitMultiArray:true,
			}
		},
        watch:{
            defaultRegions:{
                handler(arr,oldArr=[]){
                    // 避免传的是字面量的时候重复触发
                    // console.log(arr,oldArr);
                    if(arr.length!==3 || arr.join('')===oldArr.join('')) return;
                    // console.log('触发了');
                    this.handleDefaultRegions()
                },
                immediate:true,
            },
        },
        computed:{
            multiArray(){
                return this.pickedArr.map(arr=>arr.map(item=>item.name))
            },
            pickedArr(){
                // 进行初始化
                if(this.isInitMultiArray){
                    return [
                        china_regions,
                        china_regions[0].childs,
                        china_regions[0].childs[0].childs
                    ]
                }
                return [china_regions,this.cityArr,this.districtArr];
            }
        },
		methods: {
            handleColumnChange(e){
                // console.log(e);
                this.isInitMultiArray = false;
                const that = this;
                let col = e.detail.column;
                let row = e.detail.value;
                that.multiIndex[col] = row;
                switch(col){
                    case 0:
                        if(china_regions[that.multiIndex[0]].childs.length==0){
                            that.cityArr = that.districtArr = [china_regions[that.multiIndex[0]]]
                            break
                        }
                        that.cityArr = china_regions[that.multiIndex[0]].childs
                        that.districtArr = china_regions[that.multiIndex[0]].childs[that.multiIndex[1]].childs
                        break;
                    case 1:
                        that.districtArr = china_regions[that.multiIndex[0]].childs[that.multiIndex[1]].childs
                        break;
                    case 2:
                        break;
                }
            },
            handleValueChange(e){
                // 结构赋值
                let [index0,index1,index2] = e.detail.value;
                let [arr0,arr1,arr2] = this.pickedArr;
                let address = [arr0[index0],arr1[index1],arr2[index2]];
                // console.log(address);
                this.$emit('getRegions',address)
            },
            handleDefaultRegions(){
                this.isInitMultiArray = false;
                let children = china_regions;
                for(let i = 0;i< this.defaultRegions.length;i++){
                    for(let j = 0;j<children.length;j++){
                        // 模糊匹配
                        if(children[j].name.includes(this.defaultRegions[i])){
                            // console.log(i,j,children.length-1);
                            children = children[j].childs;
                            if(i==0){
                                this.cityArr = children
                            }else if(i==1){
                                this.districtArr = children
                            }
                            this.$set(this.multiIndex,i,j)
                            // console.log(this.multiIndex);
                            break;
                        }else{
                            // 首次匹配失败就用默认的初始化
                            // console.log(i,j,children.length-1);
                            if(i==0 && j==(children.length-1)){
                                this.isInitMultiArray = true;
                            }
                        }
                    }
                }
            }
		},
	}
</script>

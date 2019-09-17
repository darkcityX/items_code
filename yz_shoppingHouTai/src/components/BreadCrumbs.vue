<template>
	<Row>
        <Col span="24">
            <Breadcrumb class="breadCrumbs">
                <!-- <BreadcrumbItem>{{ breadListIm[0] | oneFilter }}</BreadcrumbItem>
                <BreadcrumbItem>1111</BreadcrumbItem>
                <BreadcrumbItem>Layout</BreadcrumbItem> -->
				<BreadcrumbItem v-for="(str,index) in breadListIm" :key="index"></BreadcrumbItem>
            </Breadcrumb>
        </Col>
    </Row>
</template>

<script>
	import { oneBread } from "@/common/js/BreadFilter.js";
	export default {
		data(){
			return {
				breadListIm: {
					
				}
			}
		},
		watch: {
			$route(to, from){
				this.loadBread( to.fullPath );
			}
		},
		filters: {
			// 价格过滤器
			oneFilter(str) {
				return oneBread(str);
			}
		},		
		methods: {
			loadBread( path ){
				if( path != "" ){
					console.log( path );
					let newPath = path.substring(1,path.length-1);
					console.log( newPath.split("/") );
					this.breadListIm = newPath.split("/");
					console.log( "---------- 1111 -------------" );
					console.log( this.breadListIm );

				}
			}
		}
	}
</script>

<style lang="less">
	
</style>
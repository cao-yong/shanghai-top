
	// 模拟JSON 数据
	const dataInt={
	"data":[
		{"src":"s10.bmp","alt":"s10","figcaption":"10"},
		{"src":"s11.bmp","alt":"s11","figcaption":"11"},
		{"src":"s12.bmp","alt":"s12","figcaption":"12"},
		{"src":"s13.bmp","alt":"s13","figcaption":"13"},
		{"src":"s14.bmp","alt":"s14","figcaption":"14"},
		{"src":"s15.bmp","alt":"s15","figcaption":"15"},
		{"src":"s16.bmp","alt":"s16","figcaption":"16"},
		{"src":"s17.bmp","alt":"s17","figcaption":"17"},
		{"src":"s18.bmp","alt":"s18","figcaption":"18"},
		{"src":"s19.bmp","alt":"s19","figcaption":"19"},
		{"src":"s20.bmp","alt":"s20","figcaption":"20"},
		{"src":"s21.bmp","alt":"s21","figcaption":"21"},
		{"src":"s22.bmp","alt":"s22","figcaption":"22"},
		{"src":"s23.bmp","alt":"s23","figcaption":"23"},
		{"src":"s24.bmp","alt":"s24","figcaption":"24"},
		{"src":"s25.bmp","alt":"s25","figcaption":"25"},
		{"src":"s26.bmp","alt":"s26","figcaption":"26"},
		{"src":"s27.bmp","alt":"s27","figcaption":"27"},
		{"src":"s28.bmp","alt":"s28","figcaption":"28"},
		{"src":"s29.bmp","alt":"s29","figcaption":"29"},
		{"src":"s30.bmp","alt":"s30","figcaption":"30"},
		{"src":"s31.bmp","alt":"s31","figcaption":"31"},
		{"src":"s32.bmp","alt":"s32","figcaption":"32"},	

	]

};
		    let oParent=document.getElementsByClassName("figureArea")[0];
			//将数据块渲染到页面尾部
			for (let i=0;i<dataInt.data.length;i++){
				let oBox=document.createElement("div");
				oBox.className="box";
				oParent.appendChild(oBox);
				let oPic=document.createElement("figure");
				oPic.className="pic";
				oBox.appendChild(oPic);
				let oImg=document.createElement("img");
				oImg.src="../images/scenery/"+dataInt.data[i].src;
				oImg.alt=dataInt.data[i].alt;
				oPic.appendChild(oImg);
                let figcaption=document.createElement("figcaption");
                figcaption.textContent=dataInt.data[i].figcaption;
				oPic.appendChild(figcaption);
			}


	
	
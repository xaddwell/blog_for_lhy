#include <SPI.h> //导入库
#include <TFT_eSPI.h> 
  
TFT_eSPI tft = TFT_eSPI(); 

void setup() {
  // put your setup code here, to run once:
  tft.init();                               //初始化
  tft.fillScreen(TFT_BLACK);                //屏幕颜色
  tft.setCursor(10, 10, 1);                 //设置起始坐标(10, 10)，2 号字体
  tft.setTextColor(TFT_YELLOW);             //设置文本颜色为白色
  tft.setTextSize(2);                       //设置文字的大小 (1~7)
  tft.println("TFT_Text");                  //显示文字
  tft.fillCircle(30,30,10,TFT_BLUE);        //画圆
  tft.drawLine(10,50, 118, 50, TFT_WHITE);  //画线
  tft.drawPixel(70,70,TFT_RED);             //画点
  tft.setTextColor(TFT_WHITE,TFT_BLUE);     //设置文字颜色和背景颜色
  tft.setCursor(10, 80, 1);                 //设置起始坐标(10, 10)，2 号字体
  tft.println("TFT_Text");                  //显示文字
}
void loop() {
  // put your main code here, to run repeatedly:
}

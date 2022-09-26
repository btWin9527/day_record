import urllib.request, urllib.error
from bs4 import BeautifulSoup
import re
import xlwt

# 需要安装依赖项 html5lib, bs4
# pip install bs4
# pip install html5lib
# pip install xlwt

# 取消ssl证书验证
import ssl

context = ssl._create_unverified_context()

# 定义基础url，发现规律，每页最后变动的是start=后面的数字
baseurl = "https://movie.douban.com/top250?start="


# 【1】使用urllib库获取网页
# 定义一个函数getHtmlByURL,得到指定url网页的内容
def geturl(url):
    # 自定义headers(伪装，告诉豆瓣服务器，我们是什么类型的机器,以免被反爬虫)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
    }
    # 利用Request类来构造自定义头的请求
    req = urllib.request.Request(url, headers=headers)
    # 定义一个接收变量，用于接收
    html = ""
    try:
        # urlopen()方法的参数，发送给服务器并接收响应
        resp = urllib.request.urlopen(req, context=context)
        # urlopen()获取页面内容，返回的数据格式为bytes类型，需要decode()解码，转换成str类型
        html = resp.read().decode("utf-8")
    except urllib.error.URLError as e:
        if hasattr(e, "code"):
            print(e.code)
        if hasattr(e, "reason"):
            print(e.reason)
    return html


# 【3】使用正则解析数据块
# 定义正则对象获取指定的内容
# 提取链接（链接的格式为<a href="开头）
findLink = re.compile(r'<a href="(.*?)">')
# 提取图片
findImgSrc = re.compile(r'<img.*src="(.*?)"', re.S)  # re.S让 '.' 特殊字符匹配任何字符，包括换行符；
# 提取影片名称
findTitle = re.compile(r'<span class="title">(.*)</span>')
# 提取影片评分
findRating = re.compile(r'<span class="rating_num" property="v:average">(.*)</span>')
# 提取评价人数
findJudge = re.compile(r'<span>(\d*)人评价</span>')
# 提取简介
inq = re.compile(r'<span class="inq">(.*)</span>')
# 提取相关内容
findBd = re.compile(r'<p class="">(.*)</p>(.*)<div', re.S)

# 定义接收10页的列表
dataList = []


# 【2】使用BeautifulSoup和re库解析数据
# 定义一个函数解析网页
def analysisData(url):
    # 获取指定网页
    for i in range(0, 10):
        html = geturl(url)
        # 指定解析器解析html,得到BeautifulSoup对象
        soup = BeautifulSoup(html, 'html5lib')
        # 定位到我们的数据块
        for item in soup.findAll('div', class_='item'):
            # item 是bs4.element.Tag对象，这里转为字符串处理
            item = str(item)
            # 定义一个列表 存储每一个电影解析的内容
            data = []
            # findall返回一个列表，这里提取链接
            link = re.findall(findLink, item)[0]
            data.append(link)
            img = re.findall(findImgSrc, item)[0]
            data.append(img)
            title = re.findall(findTitle, item)
            # 一般都有一个中文名 一个英文名
            if len(title) == 2:
                # ['肖申克的救赎', '\xa0/\xa0The Shawshank Redemption']
                titlename = title[0] + title[1].replace(u'\xa0', '')
            else:
                titlename = title[0] + ''
            data.append(titlename)
            pf = re.findall(findRating, item)[0]
            data.append(pf)
            pjrs = re.findall(findJudge, item)[0]
            data.append(pjrs)
            # 简介可能没有
            inqInfo = re.findall(inq, item)
            if len(inqInfo) == 0:
                data.append(" ")
            else:
                data.append(inqInfo[0])
            bd = re.findall(findBd, item)[0]

            # [('\n                            导演: 弗兰克·德拉邦特 Frank Darabont\xa0\xa0\xa0主演: 蒂姆·罗宾斯 Tim Robbins /...<br/>\n                            1994\xa0/\xa0美国\xa0/\xa0犯罪 剧情\n                        ', '\n\n                        \n                        ')]
            bd[0].replace(u'\xa0', '').replace('<br/>', '')
            bd = re.sub('<\\s*b\\s*r\\s*/\\s*>', "", bd[0])
            bd = re.sub('(\\s+)?', '', bd)
            data.append(bd)
            dataList.append(data)
    return dataList


def main():
    # 【4】导出为excel
    analysisData(baseurl)
    savepath = "/Users/guojiguang/Downloads/test/豆瓣250.xls"
    book = xlwt.Workbook(encoding='utf-8', style_compression=0)  # 创建Workbook对象
    sheet = book.add_sheet("豆瓣电影Top250", cell_overwrite_ok=True)  # 创建工作表
    col = ("电影详情链接", "图片链接", "电影中/外文名", "评分", "评论人数", "概况", "相关信息")
    print(len(dataList))
    for i in range(0, 7):
        sheet.write(0, i, col[i])
    for i in range(0, 250):
        print('正在保存第' + str((i + 1)) + '条')
        data = dataList[i]
        for j in range(len(data)):
            sheet.write(i + 1, j, data[j])
    book.save(savepath)


if __name__ == "__main__":
    main()

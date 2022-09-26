from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.error import URLError

# 取消ssl证书验证
import ssl

context = ssl._create_unverified_context()

baseUrl = 'https://pythonscraping.com/pages/page1.html'


def getTitle(url):
    try:
        # urlopen用来打开并读取一个从网络获取的远程对象
        # urllib.request.urlopen(url, data=None, [timeout, ]*, cafile=None, capath=None, cadefault=False, context=None)
        html = urlopen(url, context=context)
    # 输出在域名为 http://pythonscraping.com 的服务器上 < 网络应用根地址 >/ pages 文件夹里的 HTML 文件 page1.html 的源代码
    # print(html.read())

    # bs = BeautifulSoup(html.read(), 'html.parser')
    # http状态错误
    except HTTPError as e:
        return None
    try:
        bs = BeautifulSoup(html.read(), 'html.parser')
        # bs.findAll(TagName, Attribute)
        # 筛选满足要求的数据
        nodeList = bs.findAll('div', {})
        for node in nodeList:
            # getText() 去掉标签，只保留文本
            print(node.getText(), 'text')

        title = bs.body.h1
    except AttributeError as e:
        return None
    return title


title = getTitle(baseUrl)
if title is None:
    print('Title could not be found')
else:
    print(title)

getTitle(baseUrl)

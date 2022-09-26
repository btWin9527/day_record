import urllib.request

url = "http://www.baidu.com"
res = urllib.request.urlopen(url)
print(res)

# 读取响应体
bys = res.read()
# print(bys) # <!DOCTYPE html><!--STATUS OK-->\n\n\n    <html><head><meta...

# print(bys.decode('utf-8')) # 获取字符串内容，需要指定解码方式,这部分我们放到html文件中就是百度的主页

print(res.version, 'version')

print(res.getcode())  # 200

print(res.status)  # 200

# 获取响应描述字符串
print(res.reason)  # OK

# 获取实际请求的页面
print(res.geturl())  # http://www.baidu.com/

# 获取响应头信息，返回字符串
print(res.info())  # Bdpagetype: 1 Bdqid: 0x803fb2b9000fdebb...


# 获取响应头信息,返回二元元组列表
print(res.getheaders())  # [('Bdpagetype', '1'), ('Bdqid', '0x803fb2b9000fdebb'),...]
print(res.getheaders()[0])  # ('Bdpagetype', '1')
# 获取特定响应头信息
print(res.getheader(name="Content-Type"))  # text/html;charset=utf-8

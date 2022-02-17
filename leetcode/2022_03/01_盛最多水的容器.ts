//给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
//
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
//
// 返回容器可以储存的最大水量。
//
// 说明：你不能倾斜容器。
//
//
//
// 示例 1：
//
//
//
//
//输入：[1,8,6,2,5,4,8,3,7]
//输出：49
//解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
//
// 示例 2：
//
//
//输入：height = [1,1]
//输出：1
//
//
//
//
// 提示：
//
//
// n == height.length
// 2 <= n <= 10⁵
// 0 <= height[i] <= 10⁴
//
// Related Topics 贪心 数组 双指针 👍 3186 👎 0

//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} height
 * @return {number}
 * @description 双重for实现，在n=10^5时，会超时【运行失败】
 */
function maxArea(height: number[]): number {
    let maxArea = 0;
    for (let i = 0; i < height.length - 1; i++) {
        // 第二次循环位于第一次循环之后，则j初始值j = i + 1
        for (let j = i + 1; j < height.length; j++) {
            let area = Math.min(height[i], height[j]) * (j - i);
            maxArea = Math.max(area, maxArea)
        }
    }
    return maxArea
}

/**
 * @param {number[]} height
 * @return {number}
 * @description 双指针实现
 * 设两指针i,j，指向的水槽高度分别为h[i],h[j]，此状态下水槽面积为S(i,j)。由于可容纳水的高度由两板中的短板决定，
 * 因此可得面积公示：S(i,j) = min(h[i], h[j]) * (j-i)
 * 算法流程：
 * 1. 初始化：双指针i,j分列水槽左右两端
 * 2. 循环收窄：直到双指针相遇时跳出
 *    1. 更新面积最大值res
 *    2. 选定两板高度中的短板，向中间收窄一格
 * 3. 返回值：返回面积最大值res即可
 */
function maxArea2(height: number[]): number {
    let i = 0, j = height.length - 1, res = 0;
    while (i < j) {
        res = height[i] < height[j] ?
            Math.max(res, (j - i) * height[i++]) :
            Math.max(res, (j - i) * height[j--])
    }
    return res
}

//leetcode submit region end(Prohibit modification and deletion)

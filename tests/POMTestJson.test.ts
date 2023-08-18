import test, { expect } from "@playwright/test"
import { posts } from "../testData/posts.json"

import GlobalFeedListPage from "../pages/globalFeedPage"
import HomePage from "../pages/homePage"
import LoginPage from "../pages/loginPage"
import NewPostPage from "../pages/newPostPage"
import PostViewPage from "../pages/postViewPage"

const uName = "corpdevops@gmail.com"
const pwd = "conduit123"


test.describe('Blog Post', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)
        await homePage.navigateToLogin()
        await loginPage.enterUsername(uName)
        await loginPage.enterPassword(pwd)
        await loginPage.clickLoginBtn()
    })

    posts.forEach((item, index) => {
        test(`Create Blog post - Iteration: ${index + 1}`, async ({ page }) => {
            const homePage = new HomePage(page)
            const newPostPage = new NewPostPage(page)
            await homePage.createNewPost()
            await newPostPage.enterArticle(posts[index].articleTitle)
            await newPostPage.enterAbtArticle(posts[index].aboutArticle)
            await newPostPage.enterArticleDetail(posts[index].articleDetail)
            await newPostPage.enterTag(posts[index].tagName)
            await newPostPage.clickPublishBtn()
            await expect(newPostPage.isArticleCreated(posts[index].articleTitle)).toContainText(posts[index].articleTitle)
        })
    })

    test.only("Create Blog post using json file", async ({ page }) => {
        const homePage = new HomePage(page)
        const newPostPage = new NewPostPage(page)
        await homePage.createNewPost()
        await newPostPage.enterArticle(posts[2].articleTitle)
        await newPostPage.enterAbtArticle(posts[2].aboutArticle)
        await newPostPage.enterArticleDetail(posts[2].articleDetail)
        await newPostPage.enterTag(posts[2].tagName)
        await newPostPage.clickPublishBtn()
        await expect(newPostPage.isArticleCreated(posts[2].articleTitle)).toContainText(posts[2].articleTitle)
    })

})
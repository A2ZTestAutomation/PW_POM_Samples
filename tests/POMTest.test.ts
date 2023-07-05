import test, { expect } from "@playwright/test"
import GlobalFeedListPage from "../pages/globalFeedPage"
import HomePage from "../pages/homePage"
import LoginPage from "../pages/loginPage"
import NewPostPage from "../pages/newPostPage"
import PostViewPage from "../pages/postViewPage"

const uName = "corpdevops@gmail.com"
const pwd = "conduit123"
const articleTitle = "MyNewArticle3"
const aboutArticle = 'This article is about Playwright'
const articleDetail = 'In this article we are going to discuss about Playwright POM'
const tagName = 'introduction'

test.describe('Blog Post App CRUD', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        const homePage = new HomePage(page)
        const loginPage = new LoginPage(page)
        await homePage.navigateToLogin()
        await loginPage.enterUsername(uName)
        await loginPage.enterPassword(pwd)
        await loginPage.clickLoginBtn()
    })

    test("Create a NewPost test-01", async ({ page }) => {
        const homePage = new HomePage(page)
        const newPostPage = new NewPostPage(page)
        await homePage.createNewPost()
        await newPostPage.enterArticle(articleTitle)
        await newPostPage.enterAbtArticle(aboutArticle)
        await newPostPage.enterArticleDetail(articleDetail)
        await newPostPage.enterTag(tagName)
        await newPostPage.clickPublishBtn()
        await expect(newPostPage.isArticleCreated(articleTitle)).toContainText(articleTitle)
    })

    test.only("View Post Details test-02", async ({ page }) => {
        const homePage = new HomePage(page)
        const viewPostPage = new PostViewPage(page)
        await homePage.navigateToGlobalFeed()
        //Updated for readonly property
        // const globalList = new GlobalFeedListPage(page)
        // await globalList.clickArticle(articleTitle)
        const globalList = new GlobalFeedListPage(page, articleTitle)
        await globalList.clickArticle()
        await expect(viewPostPage.isPostAvailable(articleTitle)).toContainText(articleTitle)
    })
})
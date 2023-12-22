describe("The Home Page", () => {
    const build = () => {
        cy.intercept({ url: "https://api.github.com/users/*", middleware: true }, (req) => {
            req.on("response", (res) => {
                res.setThrottle(1000);
            });
        }).as("fetchGitHubApiUsers");

        return {
            selectors: {
                usernameInput: () => cy.get("input"),
                submitButton: () => cy.get("button"),
                output: () => cy.get("#output"),
                usernameHeadline: () => cy.get("#output").get("h2"),
            },
            interceptAlias: {
                fetchGitHubApiUsers: "@fetchGitHubApiUsers",
            },
        };
    };

    it("Successfully loads Homepage", () => {
        cy.visit("/");
    });

    it("Retrieves GitHub User data", () => {
        const { selectors, interceptAlias } = build();

        cy.visit("/");

        selectors.usernameInput().type("glendajunker");
        selectors.submitButton().click();
        selectors.output().contains("Loading...");

        cy.wait(interceptAlias.fetchGitHubApiUsers);
        selectors.usernameHeadline().contains("glendajunker");
    });

    it("Returns error message if no user is found", () => {
        const { selectors } = build();

        cy.visit("/");

        selectors.usernameInput().type("asda76d7a8ad6");
        selectors.submitButton().click();
        selectors.output().contains("Error: Error! Status: 404");
    });
});

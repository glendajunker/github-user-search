describe("The Home Page", () => {
    const build = () => {
        cy.intercept({ url: "https://api.github.com/users/*", middleware: true }, (req) => {
            req.on("response", (res) => {
                res.setThrottle(1000);
            });
        }).as("fetchGitHubApiUsers");

        const selectors = {
            usernameInput: () => cy.get("input"),
            submitButton: () => cy.get("button"),
            output: () => cy.get("#outpumt"),
            usernameHeadline: () => cy.get("#output").get("h2")
        };

        return {
            selectors,
            interceptAlias: {
                fetchGitHubApiUsers: "@fetchGitHubApiUsers"
            },
            assert: {
                assert404ErrorStatus: () => selectors.output().contains("Error: Error! Status: 404")
            }
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
        const { selectors, assert } = build();

        cy.visit("/");

        selectors.usernameInput().type("asda76d7a8ad6");
        selectors.submitButton().click();
        assert.assert404ErrorStatus();
    });
});

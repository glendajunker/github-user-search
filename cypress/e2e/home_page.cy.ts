describe("The Home Page", () => {
    it("Successfully loads Homepage", () => {
        cy.visit("/");
    });

    it("Retrieves GitHub User data", () => {
        cy.intercept({ url: "https://api.github.com/users/*", middleware: true }, (req) => {
            req.on("response", (res) => {
                res.setThrottle(1000);
            });
        }).as("fetchGitHubApiUsers");

        cy.visit("/");
        cy.get("input").type("glendajunker");
        cy.get("button").click();
        cy.get("#output").contains("Loading...");

        cy.wait("@fetchGitHubApiUsers");
        cy.get("#output").get("h2").contains("glendajunker");
    });

    it("Returns error message if no user is found", () => {
        cy.visit("/");
        cy.get("input").type("asda76d7a8ad6");
        cy.get("button").click();
        cy.get("#output").contains("Error: Error! Status: 404");
    });
});

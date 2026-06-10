"use client";

import React, { useState } from "react";
import Container from "~/app/_components/containers/container";
import Layout from "~/app/_components/layouts/layout";
import AsideNavbar from "~/app/_components/navbars/aside-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const htmlVisualizations = [
  { id: "dashboard_gauges", label: "Dashboard Gauges", src: "/viz/dashboard_gauges.html" },
  { id: "kmeans_clusters", label: "K-Means Clusters", src: "/viz/kmeans_clusters.html" },
  { id: "lda_top_terms", label: "LDA Top Terms", src: "/viz/lda_top_terms.html" },
  { id: "length_distributions", label: "Length Distributions", src: "/viz/length_distributions.html" },
  { id: "pairs_plot", label: "Pairs Plot", src: "/viz/pairs_plot.html" },
  { id: "pca_scatter", label: "PCA Scatter", src: "/viz/pca_scatter.html" },
  { id: "prompt_wordcloud", label: "Prompt Word Cloud", src: "/viz/prompt_wordcloud.html" },
  { id: "result_wordcloud", label: "Result Word Cloud", src: "/viz/result_wordcloud.html" },
  { id: "sentiment_comparison", label: "Sentiment Comparison", src: "/viz/sentiment_comparison.html" },
  { id: "tfidf_heatmap", label: "TF-IDF Heatmap", src: "/viz/tfidf_heatmap.html" },
  { id: "top_prompt_words", label: "Top Prompt Words", src: "/viz/top_prompt_words.html" },
  { id: "top_result_words", label: "Top Result Words", src: "/viz/top_result_words.html" },
  { id: "word_stats_table", label: "Word Stats Table", src: "/viz/word_stats_table.html" },
];

const imageVisualizations = [
  { id: "bigrams", label: "Bigrams", src: "/viz/bigrams.png" },
  { id: "boxplots", label: "Boxplots", src: "/viz/boxplots.png" },
  { id: "correlation_matrix", label: "Correlation Matrix", src: "/viz/correlation_matrix.png" },
  { id: "nrc_emotions", label: "NRC Emotions", src: "/viz/nrc_emotions.png" },
  { id: "tfidf_top_words", label: "TF-IDF Top Words", src: "/viz/tfidf_top_words.png" },
  { id: "unique_words", label: "Unique Words", src: "/viz/unique_words.png" },
];

export default function Visualizations() {
  const [activeHtml, setActiveHtml] = useState(htmlVisualizations[0]!.id);

  return (
    <Layout>
      <Container className="px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-3 hidden md:block">
            <AsideNavbar />
          </aside>
          <section className="col-span-12 flex flex-col gap-6 md:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>Data Visualizations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Explore interactive charts and statistical analyses of the AI Adlibs dataset.
                </p>
              </CardContent>
            </Card>

            {/* Interactive HTML visualizations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Interactive Charts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeHtml} onValueChange={setActiveHtml}>
                  <div className="overflow-x-auto border-b px-4 pt-4">
                    <TabsList className="inline-flex h-auto flex-wrap gap-1 bg-transparent p-0">
                      {htmlVisualizations.map((viz) => (
                        <TabsTrigger
                          key={viz.id}
                          value={viz.id}
                          className="mb-2 rounded-md border text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          {viz.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  {htmlVisualizations.map((viz) => (
                    <TabsContent key={viz.id} value={viz.id} className="m-0">
                      <iframe
                        src={viz.src}
                        title={viz.label}
                        className="h-[600px] w-full rounded-b-lg border-0"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Static image visualizations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Static Charts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {imageVisualizations.map((viz) => (
                    <div key={viz.id} className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{viz.label}</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={viz.src}
                        alt={viz.label}
                        className="w-full rounded-lg border object-contain"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </Container>
    </Layout>
  );
}

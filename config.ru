use(
  Rack::Static,
  urls: %w(/images /stylesheets /javascript),
  root: '.',
  header_rules: [
    [:all, { 'Cache-Control' => 'no-cache' }]
  ]
)

run ->(env) do
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'no-cache'
    },
    File.open('index.html', File::RDONLY)
  ]
end

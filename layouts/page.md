# {{ .Title }}

{{ with .Date }}*{{ .Format (site.Params.dateFormat | default "2006-01-02") }}*{{ end }}
{{ with .Description }}
> {{ . }}
{{ end }}
{{ .RawContent }}
